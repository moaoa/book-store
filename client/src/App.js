import React, { createContext, useState, useEffect, useReducer } from 'react'
import './App.css'
import Book from './components/Book'
import Nav from './components/Nav'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import CreateNewBookPage from './components/CreateNewBookPage'
import HomePage from './components/HomePage'
import EditPage from './components/EditPage'
import { FETCH_SUCCESS, FETCH_FAILED } from './actions/constants'
import reducer from './reducers/index.js'
const initialState = {
    books: [],
    error: '',
    loading: true,
}
export const BooksContext = React.createContext(initialState)
function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch('/allbooks', {
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: FETCH_SUCCESS, payload: data.books })
            })
            .catch((e) => {
                dispatch({ type: FETCH_FAILED, payload: JSON.stringify(e) })
            })
    }, [])
    return (
        <BooksContext.Provider value={{ state, dispatch }}>
            <Router>
                <div className="App">
                    <Nav />

                    <Switch>
                        <Route path="/" exact children={<HomePage />} />
                        <Route
                            path="/show-book/:slug"
                            render={(props) => {
                                const {
                                    match: {
                                        params: { slug },
                                    },
                                } = props
                                const book = state.books.find(
                                    (book) => book.slug === slug
                                )
                                return <Book book={book} />
                            }}
                        />
                        <Route
                            path="/new-book"
                            render={(props) => <CreateNewBookPage {...props} />}
                        />
                        <Route
                            path="/edit/:slug"
                            render={(props) => <EditPage {...props} />}
                        />
                    </Switch>
                </div>
            </Router>
        </BooksContext.Provider>
    )
}

export default App
