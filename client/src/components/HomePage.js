import React, { useContext } from 'react'
import Book from '../components/Book'
import { BooksContext } from '../App'
export default function HomePage() {
    const { state } = useContext(BooksContext)
    return (
        <div>
            {state.books.length == 0
                ? 'loading'
                : state.books.map((book) => (
                      <Book key={book.slug} book={book} />
                  ))}
        </div>
    )
}
