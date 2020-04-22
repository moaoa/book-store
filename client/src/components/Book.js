import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../stateProvider'
import { DELETE_BOOK, FETCH_FAILED } from '../actions/constants'

export default function Book(props) {
    const history = useHistory()

    const { removeBook, books, dispatch } = useContext(Context)
    let slug = props?.book?.slug || props.match.params.slug

    console.log('books: ', books)
    console.log('removeBook: ', removeBook)
    console.log('dispatch: ', dispatch)
    const book = books.find((book) => book.slug === slug)
    const sendDeleteReq = () => {
        fetch(`/books/${book.slug}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    // store.dispatch({ type: DELETE_BOOK, payload: { slug } })
                    removeBook(book.slug)
                    history.push('/')
                }
            })
            .catch((e) => {
                // store.dispatch({ type: FETCH_FAILED, bayload: e })
                console.log(e)
            })
    }

    return book ? (
        <div className="bookComponent">
            <div></div>
            <div>title: {props.book.title}</div>
            <div>publidhedAt: {props.book.publishedAt}</div>
            <div>pageCount: {props.book.pageCount}</div>
            <div>price: {props.book.price}</div>
            <div className="book-buttons">
                <Link to={`/edit/${props.book.slug}`}>Edit</Link>
                <button onClick={sendDeleteReq}>Delete</button>
            </div>
        </div>
    ) : (
        <div>Error : Book doesn't exist</div>
    )
}
