import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useCallback, useContext } from 'react'
import { context } from '../stateProvider'
import { DELETE_BOOK, FETCH_FAILED } from '../actions/constants'

export default function Book(props) {
    const history = useHistory()
    const store = useContext(context)
    let { slug } = props.book
    const sendDeleteReq = useCallback(() => {
        fetch(`/books/${slug}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    history.push('/')
                    store.dispatch({ type: DELETE_BOOK, payload: { slug } })
                }
            })
            .catch((e) => {
                store.dispatch({ type: FETCH_FAILED, bayload: e })
                console.log(e)
            })
    }, [slug, history, store])

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
