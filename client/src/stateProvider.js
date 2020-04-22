import React, { createContext, useReducer } from 'react'
import reducer from './reducers/index'
import { DELETE_BOOK } from './actions/constants'
const initialState = {
    books: [],
    error: '',
    loading: true,
}
export const Context = createContext(initialState)
export default function StateProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const removeBook = (slug) => {
        dispatch({ type: DELETE_BOOK, bayload: slug })
    }
    return (
        <Context.Provider
            value={{
                books: state.books,
                loading: state.loading,
                dispatch,
                removeBook,
            }}
        >
            {children}
        </Context.Provider>
    )
}
