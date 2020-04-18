import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <h1>Book Store</h1>
            <div className="create-new-book">
                <Link to="/">Home page</Link>
                <Link to="/new-book">create new book</Link>
            </div>
        </nav>
    )
}
