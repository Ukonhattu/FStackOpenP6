import Anecdotereducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecdotes: Anecdotereducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store