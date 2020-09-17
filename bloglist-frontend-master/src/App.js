import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import './App.css'

const App = () => {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState({ message: '', type: '' })

    const blogFormRef = useRef()

    const login = async (credentials) => {
        const user = await loginService.login(credentials)
        setTimeout(() => { setUser(user) }, 0)
    }

    const logout = () => {
        loginService.logout()
        setTimeout(() => { setUser(null) }, 0)
    }

    const addBlog = async (newBlog) => {
        await blogService.createOne(newBlog)
        blogFormRef.current.toggleVisibility()
        const notification = {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            type: 'success'
        }
        handleNotification(notification)
        const blogs = await blogService.getAll()
        setBlogs(blogs)
    }

    const likeBlog = async (favoriteBlog) => {
        const newObject = {
            user: favoriteBlog.user.id,
            author: favoriteBlog.author,
            title: favoriteBlog.title,
            url: favoriteBlog.url,
            likes: favoriteBlog.likes + 1
        }
        await blogService.updateOne(favoriteBlog.id, newObject)
        const notification = {
            message: `${favoriteBlog.title} liked`,
            type: 'success'
        }
        handleNotification(notification)
        const blogs = await blogService.getAll()
        setBlogs(blogs)
    }

    const removeBlog = async (blogToRemove) => {
        if (window.confirm(`Remove blog ${blogToRemove.title}?`)) {
            await blogService.deleteOne(blogToRemove.id)
            const notification = {
                message: `${blogToRemove.title} deleted`,
                type: 'success'
            }
            handleNotification(notification)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
    }

    const handleNotification = (notification) => {
        console.log(notification.message)
        setNotification(notification)
        setTimeout(() => {
            setNotification({ message: '', type: '' })
        }, 5000)
    }

    useEffect(() => {
        const loggedUser = loginService.getUser()
        if(loggedUser) {
            setUser(loggedUser)
            blogService.setToken(loggedUser.token)
        }
    }, [])

    useEffect(() => {
        if(user) {
            blogService.getAll().then(blogs =>
                setBlogs(blogs)
            )
        } else {
            setBlogs([])
        }
    }, [user])

    return (
        <div>
            <Notification notification={notification} />
            {user
                ? <div>
                    <h2>blogs</h2>
                    <UserInfo user={user} logout={logout} />
                    <BlogList blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} handleNotification={handleNotification} />
                    <Togglable buttonLabel='new blog' ref={blogFormRef}>
                        <h2>create new</h2>
                        <NewBlogForm addBlog={addBlog} handleNotification={handleNotification} />
                    </Togglable>
                </div>
                : <div>
                    <h2>Log in to application</h2>
                    <LoginForm login={login} handleNotification={handleNotification} />
                </div>
            }

        </div>
    )
}

export default App