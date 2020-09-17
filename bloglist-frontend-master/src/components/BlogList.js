import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, removeBlog, handleNotification }) => {
    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} handleNotification={handleNotification} />
            )}
        </div>
    )
}

export default BlogList