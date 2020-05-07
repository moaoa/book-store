import React, { useContext, useEffect } from 'react'
import { Context } from '../stateProvider'
export default function AllUsers() {
    const { getUsers, users } = useContext(Context)
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
            {users.length != 0 ? (
                users.map((user, i) => {
                    return <div className="card">{user.name}</div>
                })
            ) : (
                <div>no users</div>
            )}
        </>
    )
}
