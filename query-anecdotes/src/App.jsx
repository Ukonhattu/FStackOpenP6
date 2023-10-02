import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import AppContext from './components/AppContext'

const App = () => {
  const queryClient = useQueryClient()
  const [state, dispatch] = useContext(AppContext)
  const voteMutation = useMutation(
    (id) => axios.patch(`http://localhost:3001/anecdotes/${id}`, { votes: anecdotes.find(a => a.id === id).votes + 1  }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      },
      onError: (error) => {
        dispatch({ type: 'SET_NOTIFICATION', data: `error: ${error.message}` })
      }
    }
  )

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote.id)
    dispatch({ type: 'SET_NOTIFICATION', data: `you voted '${anecdote.content}'` })
  }

  const anecdotesQuery = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn:  () =>
         axios.get('http://localhost:3001/anecdotes').then(res => res.data)
    }
  )

  if (anecdotesQuery.isLoading) {
    return <div>Loading...</div>
  }
  
  if (anecdotesQuery.isError) {
    return <div>Error: {anecdotesQuery.error.message}</div>
  }

  const anecdotes = anecdotesQuery.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
