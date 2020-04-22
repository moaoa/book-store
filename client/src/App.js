import React, { useEffect, useContext } from 'react'
import './App.css'
import Book from './components/Book'
import Nav from './components/Nav'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import CreateNewBookPage from './components/CreateNewBookPage'
import HomePage from './components/HomePage'
import EditPage from './components/EditPage'
import { FETCH_SUCCESS, FETCH_FAILED } from './actions/constants'
import { Context } from './stateProvider'
function App() {
    const { books, dispatch } = useContext(Context)
    useEffect(() => {
        fetch('/allbooks', {
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: FETCH_SUCCESS, bayload: data.books })
            })
            .catch((e) => {
                dispatch({ type: FETCH_FAILED, payload: JSON.stringify(e) })
            })
    }, [])
    return (
        <div className="App">
            <Nav />

            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route
                    path="/show-book/:slug"
                    render={(props) => {
                        const {
                            match: {
                                params: { slug },
                            },
                        } = props
                        const book = books.find((book) => book.slug === slug)
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
    )
}

export default App
