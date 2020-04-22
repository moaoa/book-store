import React, { useContext } from 'react'
import Book from './Book'
import { Context } from '../stateProvider'
export default function HomePage() {
    const { books, loading } = useContext(Context)
    console.log('books: ', books)
    console.log('loading: ', loading)
    if (loading) {
        return <div>loading</div>
    }
    return (
        <div>
            {books.map((book) => (
                <Book key={book.slug} book={book} />
            ))}
        </div>
    )
}
