import { createSlice } from '@reduxjs/toolkit'
import {createNew, getAll, voteFor} from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    vote: (state, action) => {
      const anecdote = state.find(n => n.id === action.payload)
      anecdote.votes += 1
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await voteFor(id)
    dispatch(vote(id))
  }
}
