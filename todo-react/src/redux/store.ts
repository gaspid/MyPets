import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from './todo'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import todo from './todo'

const persistConfig = {
  key: 'root',
  storage,
}

const combRed = combineReducers({
  todo: counterReducer,
})
const persist = persistReducer(persistConfig, combRed)

export const store = configureStore({
  reducer: persist,
})

export const persister = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
