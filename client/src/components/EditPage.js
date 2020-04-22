import React, { useCallback, useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Context } from '../stateProvider'
import { EDIT_BOOK, FETCH_FAILED } from '../actions/constants'

export default function EditPage(props) {
    const history = useHistory()
    const params = useParams()
    const { books, dispatch } = useContext(Context)

    const slug = params.slug
    const selectedBook = books.find((book) => book.slug === slug)
    const [bookState, setBookState] = useState(selectedBook)
    const handleOnChange = (key, value) => {
        console.log(key, ' ', value)

        setBookState({ ...bookState, [key]: value })
    }

    const handleSubmit = useCallback(
        (e) => {
            console.log(bookState)
            e.preventDefault()

            fetch(`/books/${slug}`, {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'applicatoin/json',
                },
                method: 'PUT',
                body: JSON.stringify(bookState),
            })
                .then((res) => res.json())
                .then((data) => {
                    // pass the old slug and the hol new book
                    console.log('book from backend: ', data.book)
                    dispatch({
                        type: EDIT_BOOK,
                        bayload: { slug, book: data.book },
                    })
                    history.push(`/show-book/${data.book.slug}`)
                })
                .catch((e) => {
                    dispatch({ type: FETCH_FAILED, bayload: JSON.stringify(e) })
                })
        },
        [slug, bookState]
    )

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>title</label>
                    <input
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                        type="text"
                        name="title"
                        defaultValue={selectedBook?.title}
                    />
                </div>
                <div className="form-group">
                    <label>page count</label>
                    <input
                        type="number"
                        name="pageCount"
                        defaultValue={selectedBook?.pageCount}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div className="form-group">
                    <label>price</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={selectedBook?.price}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div className="form-group">
                    <label> publishedAt</label>

                    <input
                        type="date"
                        name="publishedAt"
                        defaultValue={selectedBook?.publishedAt}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <input className="btn btn-primary" type="submit" />
            </form>
        </div>
    )
}
