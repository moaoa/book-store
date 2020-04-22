import React, { useCallback, useContext } from 'react'
import { Context } from '../stateProvider'
import { ADD_BOOK } from '../actions/constants'
export default function CreateNewBookPage(props) {
    let titleInput, countInput, dateInput, priceInput
    const { dispatch } = useContext(Context)

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()
            fetch('/books', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body: JSON.stringify({
                    title: titleInput.value,
                    pageCount: countInput.value,
                    publishedAt: dateInput.value,
                    price: priceInput.value,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch({ type: ADD_BOOK, payload: data.book })
                    props.history.push(`/show-book/${data.book.slug}`)
                })
                .catch((err) => console.log(err))
        },
        titleInput,
        countInput,
        dateInput,
        priceInput
    )
    return (
        <div>
            create book
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>title</label>
                    <input
                        ref={(node) => (titleInput = node)}
                        type="text"
                        name="title"
                        value="test"
                    />
                </div>
                <div className="form-group">
                    <label>page count</label>
                    <input
                        ref={(node) => (countInput = node)}
                        type="number"
                        name="pageCount"
                        value="2"
                    />
                </div>
                <div className="form-group">
                    <label>price</label>
                    <input
                        ref={(node) => (priceInput = node)}
                        type="number"
                        name="price"
                        value="2"
                    />
                </div>
                <div className="form-group">
                    <label> publishedAt</label>

                    <input
                        ref={(node) => (dateInput = node)}
                        type="date"
                        name="publishedAt"
                    />
                </div>
                <input className="btn btn-primary" type="submit" />
            </form>
        </div>
    )
}
