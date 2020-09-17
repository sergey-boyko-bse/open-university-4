import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({message: '', type: ''})

  const login = async (credentials) => {
      const user = await loginService.login(credentials)      
      setTimeout(() => {setUser(user)}, 0)
  }

  const logout = () => {
      loginService.logout()
      setTimeout(() => {setUser(null)}, 0)
  }

  const addBlog = async (newBlog) => {
      await blogService.create(newBlog)
      const notification = {
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'success'
    }
    handleNotification(notification)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
  }

  const handleNotification = (notification) => {
      console.log(notification.message)
      setNotification(notification)
      setTimeout(() => {
          setNotification({message: '', type: ''})
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
              <BlogList blogs={blogs} />
              <h2>create new</h2>
              <NewBlogForm addBlog={addBlog} handleNotification={handleNotification} />
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