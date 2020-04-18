import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useCallback, useContext } from 'react'
import { BooksContext } from '../App'
import { DELETE_BOOK } from '../actions/constants'

export default function Book(props) {
    const history = useHistory()
    const state = useContext(BooksContext)
    let { slug } = props.book
    const sendDeleteReq = useCallback(() => {
        fetch(`/books/${slug}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    // you can redirect then update state
                    history.push('/')
                    state.dispatch({ type: DELETE_BOOK, payload: { slug } })
                }
            })
    }, [slug])

    return (
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
    )
}
