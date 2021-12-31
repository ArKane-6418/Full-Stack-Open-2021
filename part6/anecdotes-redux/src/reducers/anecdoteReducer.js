import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const filterState = state.filter(as => as.id !== id)
      const newState = [...filterState, action.data]
      return newState.sort((a, b) => b.votes - a.votes)

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    default:
      return state
  }
}

// Action Creators

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const data = await anecdoteService.updateVotes(anecdote)
    dispatch({
      type: 'VOTE',
      data 
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

export default reducer