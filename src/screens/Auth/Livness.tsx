import { View, Text } from 'react-native'
import React from 'react'
import Liveness, { Challenge } from '../../components/Liveness'


const challenges: Challenge[] = [
    {
        name: "BLINK", instruction: "Blink both eyes",
        validate: (face) => {
            const leftEyeClosed =
                face.leftEyeOpenProbability <= 0.3
            const rightEyeClosed =
                face.rightEyeOpenProbability <= 0.3
            return leftEyeClosed && rightEyeClosed
        }
    },
    {
        name: "TURN_HEAD_LEFT",
        instruction: "Turn Your head left",
        validate: (face) => {
            return face.yawAngle <= -15
        }
    },
    {
        name: "TURN_HEAD_RIGHT",
        instruction: "Turn Your head right",
        validate: (face) => {
            return face.yawAngle >= 15
        }
    },
    {
        name: "SMILE", instruction: "Smile",
        validate: (face) => {
            return face.smilingProbability >= 0.7
        }
    }

]

const onComplete = () => {
    console.log("Complete")
}


export default function Livness() {
    return (
        <View>
            <Liveness
                onComplete={onComplete}
                challenges={challenges}
                performActionsTitle="Keep the device still and perform the following actions:?"
                initialTitle="Position your face in the circle"
                tooClosTitle="You're too close. Hold the device further."
                progressWidth={8}
                instructionsStyle={{ color: "green" }}

            />
        </View>
    )
}