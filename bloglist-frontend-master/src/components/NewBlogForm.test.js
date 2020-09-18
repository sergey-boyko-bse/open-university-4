import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import { act } from 'react-dom/test-utils'

test('the form calls the event handler it received as props with the right details when a new blog is called', async () => {
    const addBlog = jest.fn()
    const handleNotification = jest.fn()

    const component = render(
        <NewBlogForm addBlog={addBlog} handleNotification={handleNotification} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')

    await act(async () => {
        fireEvent.change(inputTitle, {
            target: { value: 'Test title' }
        })
        fireEvent.change(inputAuthor, {
            target: { value: 'Test author' }
        })
        fireEvent.change(inputUrl, {
            target: { value: 'http://test-url.com' }
        })
    })

    const form = component.container.querySelector('form')

    await act(async () => {
        fireEvent.submit(form)
    })

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]).toEqual({ 'author': 'Test author', 'title': 'Test title', 'url': 'http://test-url.com' })
})