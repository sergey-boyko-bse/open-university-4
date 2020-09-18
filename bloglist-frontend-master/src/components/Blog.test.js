import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let blog, component, div
let likeBlog, removeBlog, handleNotification

beforeEach(() => {
    blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'test author 1',
        url: 'http://test-url-1.com',
        likes: 25,
        user: {
            name: 'Test user 1'
        }
    }

    likeBlog = jest.fn()
    removeBlog = jest.fn()
    handleNotification = jest.fn()

    component = render(
        <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} handleNotification={handleNotification} />
    )

    div = component.container.querySelector('.blog')
})

test('renders title and author, but does not render url or number of likes by default', () => {
    expect(div).toHaveTextContent(
        `${blog.title} ${blog.author}`
    )

    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)
})

test('clicking the "show" button shows url and number of likes', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
})

test('clicking the "likes" button twice calls an appropriate event handler twice', () => {
    const buttonDetails = div.querySelector('.details-button')
    fireEvent.click(buttonDetails)

    const buttonLike = div.querySelector('.like-button')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(likeBlog).toHaveBeenCalledTimes(2)
})