import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../stateProvider'
import { DELETE_BOOK, FETCH_FAILED } from '../actions/constants'

export default function Book(props) {
    const history = useHistory()
    const params = useParams()

    const { removeBook, books, dispatch } = useContext(Context)

    let slug = props?.book?.slug || params.slug

    const book = books.find((book) => book.slug === slug)

    const sendDeleteReq = () => {
        fetch(`/books/${book.slug}`, {
            method: 'DELETE',
            headers: {
                auth: localStorage.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.success)

                if (data.success) {
                    removeBook(book.slug)
                    history.push('/')
                }
            })
            .catch((e) => {
                dispatch({ type: FETCH_FAILED, bayload: e })
                console.log(e.msg)
            })
    }

    return book ? (
        <div className="bookComponent card my-4 ">
            <div className="card-body">
                <div className="card-title">title: {props.book.title}</div>
                <div className="card-subtitle ">
                    publidhedAt: {props.book.publishedAt.split('T')[0]}
                </div>
                <div className="card-text">
                    pageCount: {props.book.pageCount}
                </div>
                <div className="card-text">price: {props.book.price}</div>
                <div className="book-buttons">
                    {props.auth && (
                        <Link
                            className="btn btn-secondary"
                            to={`/edit/${props.book.slug}`}
                        >
                            Edit
                        </Link>
                    )}
                    {props.auth && (
                        <button
                            className="btn btn-danger"
                            onClick={sendDeleteReq}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div>Error : Book doesn't exist</div>
    )
}
