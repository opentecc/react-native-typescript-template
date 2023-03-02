import * as FaceDetector from 'expo-face-detector';
import React, { useEffect, useState, useReducer } from 'react';
import { Camera, CameraType, FaceDetectionResult } from 'expo-camera';
import { Dimensions, StyleSheet, Text, View, TextStyle } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { contains, Rect } from './contains';
import MaskedView from '@react-native-masked-view/masked-view';
export interface FaceDetection {
  rollAngle: number;
  yawAngle: number;
  smilingProbability: number;
  leftEyeOpenProbability: number;
  rightEyeOpenProbability: number;
  bounds: {
    origin: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
  };
}

export interface Challenge {
  name: string;
  instruction: string;
  validate: (face: FaceDetection) => boolean;
}

const { width: windowWidth } = Dimensions.get('window');;

const PREVIEW_SIZE = 325;
const PREVIEW_RECT: Rect = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 50,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
};

interface Actions {
  FACE_DETECTED: 'yes' | 'no'
  FACE_TOO_BIG: 'yes' | 'no'
  NEXT_DETECTION: null;
}

interface Action<T extends keyof Actions> {
  type: T;
  payload: Actions[T];
}

type PossibleActions = {
  [K in keyof Actions]: Action<K>;
}[keyof Actions];

interface PropsInterface {
  challenges: Challenge[];
  onComplete: () => void;
  initialTitle?: string;
  performActionsTitle?: string;
  tooClosTitle?: string;
  // Styles Progress
  progressTintColor?: string;
  progressBackgroundColor?: string;
  progressWidth?: number;
  // style Title
  actionTitleStyle?: TextStyle;
  instructionsStyle?: TextStyle;
}

export default function Liveness({
  challenges,
  onComplete,
  initialTitle = 'Position your face in the circle',
  performActionsTitle = 'Keep the device still and perform the following actions:',
  tooClosTitle = "You're too close. Hold the device further.",
  progressTintColor = '#4032C1',
  progressBackgroundColor = '#e8e8e8',
  progressWidth = 8,
  actionTitleStyle,
  instructionsStyle,
}: PropsInterface) {
  const initialState = {
    faceDetected: 'no' as 'yes' | 'no',
    faceTooBig: 'no' as 'yes' | 'no',
    detectionsList: challenges,
    currentDetectionIndex: 0,
    progressFill: 0,
    processComplete: false,
  };
  const reducer = (
    state: typeof initialState,
    action: PossibleActions,
  ): typeof initialState => {
    switch (action.type) {
      case 'FACE_DETECTED':
        if (action.payload === 'yes') {
          return {
            ...state,
            faceDetected: action.payload,
            progressFill: 100 / (challenges.length + 1),
          };
        } else {
          // Reset
          return initialState;
        }
      case 'FACE_TOO_BIG':
        return { ...state, faceTooBig: action.payload };;
      case 'NEXT_DETECTION':
        // next detection index
        const nextDetectionIndex = state.currentDetectionIndex + 1;

        // skip 0 index
        const progressMultiplier = nextDetectionIndex + 1;

        const newProgressFill =
          (100 / (challenges.length + 1)) * progressMultiplier;

        if (nextDetectionIndex === challenges.length) {
          // success
          return {
            ...state,
            processComplete: true,
            progressFill: newProgressFill,
          };
        }
        // next
        return {
          ...state,
          currentDetectionIndex: nextDetectionIndex,
          progressFill: newProgressFill,
        };
      default:
        throw new Error('Unexpected action type.');
    }
  };
  const [hasPermission, setHasPermission] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();;
      setHasPermission(status === 'granted');
    };
    requestPermissions();
  }, []);

  const onFacesDetected = (result: FaceDetectionResult) => {
    // 1. There is only a single face in the detection results.
    if (result.faces.length !== 1) {
      dispatch({ type: 'FACE_DETECTED', payload: 'no' });;
      return;
    }
    const face: FaceDetection = result.faces[0];
    const faceRect: Rect = {
      minX: face.bounds.origin.x,
      minY: face.bounds.origin.y,
      width: face.bounds.size.width,
      height: face.bounds.size.height,
    };
    // 2. The face is almost fully contained within the camera preview.
    const edgeOffset = 50;
    const faceRectSmaller: Rect = {
      width: faceRect.width - edgeOffset,
      height: faceRect.height - edgeOffset,
      minY: faceRect.minY + edgeOffset / 2,
      minX: faceRect.minX + edgeOffset / 2,
    };
    const previewContainsFace = contains({
      outside: PREVIEW_RECT,
      inside: faceRectSmaller,
    });
    if (!previewContainsFace) {
      dispatch({ type: 'FACE_DETECTED', payload: 'no' });;
      return;
    }

    if (state.faceDetected === 'no') {
      // 3. The face is not as big as the camera preview.
      const faceMaxSize = PREVIEW_SIZE - 90;
      if (faceRect.width >= faceMaxSize && faceRect.height >= faceMaxSize) {
        dispatch({ type: 'FACE_TOO_BIG', payload: 'yes' });;
        return;
      }

      if (state.faceTooBig === 'yes') {
        dispatch({ type: 'FACE_TOO_BIG', payload: 'no' });;
      }
    }

    if (state.faceDetected === 'no') {
      dispatch({ type: 'FACE_DETECTED', payload: 'yes' });;
    }

    // Save First Face Detected state

    ///// if All is good then dispatch steps
    const detectionAction = challenges[state.currentDetectionIndex];
    if (detectionAction) {
      if (detectionAction.validate(face)) {
        dispatch({ type: 'NEXT_DETECTION', payload: null });;
      }
    }
    return;
  };

  useEffect(() => {
    if (state.processComplete) {
      onComplete();
    }
  }, [state.processComplete]);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={<View style={styles.mask} />}>
        <Camera
          style={StyleSheet.absoluteFill}
          type={CameraType.front}
          onFacesDetected={onFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 125,
            tracking: false,
          }}>
          <AnimatedCircularProgress
            style={styles.circularProgress}
            size={PREVIEW_SIZE}
            width={progressWidth}
            backgroundWidth={progressWidth}
            fill={state.progressFill}
            tintColor={progressTintColor}
            backgroundColor={progressBackgroundColor}
          />
        </Camera>
      </MaskedView>
      <View style={styles.instructionsContainer}>
        <Text style={[styles.instructions, instructionsStyle]}>
          {state.faceDetected === 'no' &&
            state.faceTooBig === 'no' &&
            initialTitle}

          {state.faceTooBig === 'yes' && tooClosTitle}

          {state.faceDetected === 'yes' &&
            state.faceTooBig === 'no' &&
            performActionsTitle}
        </Text>
        <Text style={[styles.action, actionTitleStyle]}>
          {state.faceDetected === 'yes' &&
            state.faceTooBig === 'no' &&
            challenges[state.currentDetectionIndex]?.instruction}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mask: {
    borderRadius: PREVIEW_SIZE / 2,
    height: PREVIEW_SIZE,
    width: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    alignSelf: 'center',
    backgroundColor: 'red'
  },
  circularProgress: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    marginLeft: PREVIEW_RECT.minX,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    top: 25,
    position: 'absolute',
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: PREVIEW_RECT.minY + PREVIEW_SIZE,
  },
  action: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});;
