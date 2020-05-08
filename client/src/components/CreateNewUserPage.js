import React, { useContext } from 'react'
import { Context } from '../stateProvider'
import { useHistory } from 'react-router'

export default function CreateNewUserPage(props) {
    const { registerUser, currentUser } = useContext(Context)
    const history = useHistory()
    if (currentUser) history.push('/')
    return (
        <>
            <form onSubmit={registerUser}>
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input
                        name="name"
                        id="name"
                        placeholder="Name"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input
                        name="email"
                        id="email"
                        placeholder="email"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input
                        name="password"
                        id="password"
                        placeholder="password"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">confirm password</label>
                    <input
                        className="form-control"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="confirm-password"
                    />
                </div>
                <input type="submit" value="register" />
            </form>
        </>
    )
}
