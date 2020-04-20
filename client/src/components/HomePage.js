import React, { useContext } from 'react'
import Book from './Book'
import { context } from '../stateProvider'
export default function HomePage() {
    const { state } = useContext(context)
    return (
        <div>
            {state.loading
                ? 'loading'
                : state.books.map((book) => (
                      <Book key={book.slug} book={book} />
                  ))}
        </div>
    )
}
