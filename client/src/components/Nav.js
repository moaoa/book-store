import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../stateProvider'
export default function Nav() {
    const { currentUser, logOutUser } = useContext(Context)
    const style = { paddingRight: '1rem' }
    return (
        <nav className="navbar  navbar-light bg-light">
            <h1 className="navbar-brand">Book Store</h1>
            <div className="create-new-book">
                <Link style={style} className="btn btn-light" to="/">
                    Home page
                </Link>
                {currentUser && (
                    <Link to="myAccount" className="btn btn-light">
                        my Account
                    </Link>
                )}
                {
                    <Link to="allUsers" className="btn btn-light  mx-2">
                        All Users
                    </Link>
                }
                {currentUser && (
                    <Link
                        style={style}
                        to="/new-book"
                        className="btn btn-light"
                    >
                        create new book
                    </Link>
                )}
                {currentUser ? null : (
                    <Link style={style} to="login">
                        Login
                    </Link>
                )}
                {currentUser ? null : (
                    <Link style={style} to="register">
                        register
                    </Link>
                )}
                {currentUser ? (
                    <button className="btn btn-secondary" onClick={logOutUser}>
                        logout
                    </button>
                ) : null}
            </div>
        </nav>
    )
}
