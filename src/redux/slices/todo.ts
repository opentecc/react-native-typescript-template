import {createSlice} from '@reduxjs/toolkit';

type TodoType = {
  id: number;
  text: string;
};
type ErrorType = {
  message: string;
  status: number;
};

interface TodoInteface {
  isLoading: Boolean;
  todos: TodoType[];
  error: ErrorType | null;
}

export const initialState: TodoInteface = {
  isLoading: true,
  todos: [],
  error: null,
};

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    setTodos(state, action) {
      state.todos = action.payload;
      state.isLoading = false;
    },

    updateTodo(state, action) {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    },

    deleteTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },

    addTodo(state, action) {
      state.todos = [...state.todos, action.payload];
    },
  },
});

// Reducer
export default slice.reducer;
export const {startLoading} = slice.actions;
