import React, { createContext, useReducer } from 'react'
import reducer from './reducers/index'
const initialState = {
    books: [],
    error: '',
    loading: true,
}
export const context = createContext(initialState)
const { Provider } = context
export default function StateProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Provider value={{ state, dispatch }}>{children}</Provider>
}
