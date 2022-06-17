import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todo } from '../interfase'

const initialState: todo[] = [
  {
    id: 1,
    value: true,
    title: 'задача 1',
    todo: 'описпние задачи 1',
  },
  {
    id: 2,
    value: false,
    title: 'задача 2',
    todo: 'описпние задачи 2',
  },
  {
    id: 3,
    value: true,
    title: 'задача 3',
    todo: 'описпние задачи 3',
  },
  {
    id: 5,
    value: false,
    title: 'задача 4',
    todo: 'описпние задачи 4',
  },
]

export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todo>) => {
      state.push(action.payload)
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload)
      state.splice(index, 1)
    },
    isFinite: (
      state,
      action: PayloadAction<{ value: boolean; id: number }>
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      state[index].value = !action.payload.value
    },
  },
})

export const { addTodo, deleteTodo, isFinite } = counterSlice.actions

export default counterSlice.reducer
