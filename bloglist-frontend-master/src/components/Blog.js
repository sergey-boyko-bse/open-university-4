import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, handleNotification }) => {
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => setExpanded(!expanded)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const like = async () => {
        try {
            await likeBlog(blog)
        } catch(error) {
            const notification = {
                message: error.message,
                type: 'error'
            }
            handleNotification(notification)
        }
    }

    const remove = async () => {
        try {
            await removeBlog(blog)
        } catch(error) {
            const notification = {
                message: error.message,
                type: 'error'
            }
            handleNotification(notification)
        }
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author} <button onClick={toggleExpanded}>{expanded ? 'hide' : 'show'}</button>
            {expanded
                ? <div>
                    <div>{blog.url}</div>
                    <div>
                        likes {blog.likes}
                        <button onClick={like}>like</button>
                    </div>
                    <div>{blog.user.name}</div>
                    <button onClick={remove}>remove</button>
                </div>
                : ''
            }
        </div>
    )
}

export default Blog
