import React, { useCallback } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

export default function EditPage({
    match: {
        params: { slug },
    },
    setBooks,
}) {
    let titleInput, countInput, dateInput, priceInput
    const history = useHistory()

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()
            console.log(
                'title property from the client side: ',
                titleInput.value
            )

            fetch(`/books/${slug}`, {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'applicatoin/json',
                },
                method: 'PUT',
                body: JSON.stringify({
                    title: titleInput.value,
                    price: priceInput.value,
                    pageCount: countInput.value,
                    publishedAt: dateInput.value,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    history.push(`/show-book/${data.book.slug}`)
                    setBooks((books) =>
                        books.map((book) =>
                            book.slug !== slug ? book : data.book
                        )
                    )
                })
        },
        [titleInput, priceInput, countInput, dateInput, slug]
    )

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>title</label>
                    <input
                        ref={(node) => (titleInput = node)}
                        type="text"
                        name="title"
                    />
                </div>
                <div className="form-group">
                    <label>page count</label>
                    <input
                        ref={(node) => (countInput = node)}
                        type="number"
                        name="pageCount"
                    />
                </div>
                <div className="form-group">
                    <label>price</label>
                    <input
                        ref={(node) => (priceInput = node)}
                        type="number"
                        name="price"
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
