import { createContext, useReducer, useContext } from 'react'

const AppContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
        return action.data
        case 'CLEAR_NOTIFICATION':
        return null
        default:
        return state
    }
}

const initialState = null

export const AppContextProvider = ({ children }) => {
    const [appState, appDispatch] = useReducer(reducer, initialState)


    return (
        <AppContext.Provider value={[appState, appDispatch]}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext