import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../stateProvider'
export default function Login() {
    const history = useHistory()
    const { error, logInUser } = useContext(Context)
    const handleSubmit = (e) => {
        e.preventDefault()

        logInUser(e.target.email.value, e.target.password.value)
        history.push('/')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {error && <div className="error ">{JSON.stringify(error)}</div>}
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input name="email" type="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input name="password" type="password" required />
                </div>

                <div className="form-group">
                    <input type="submit" />
                </div>
            </form>
        </>
    )
}
