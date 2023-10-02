import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import AppContext from './AppContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [state, dispatch] = useContext(AppContext)

  const createAnecdote = useMutation(
    (anecdote) => axios.post('http://localhost:3001/anecdotes', anecdote),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      }
    }
  )
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote.mutate({ content, votes: 0 })
    dispatch({ type: 'SET_NOTIFICATION', data: `you created '${content}'` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 10000)
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
