import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login, handleNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await login({ username, password })
            setUsername('')
            setPassword('')
        } catch (error) {
            const notification = {
                message: 'Wrong username or password',
                type: 'error'
            }
            handleNotification(notification)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    handleNotification: PropTypes.func.isRequired
}

export default LoginForm