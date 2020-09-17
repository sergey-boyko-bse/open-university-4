import React, {useState} from 'react'

const NewBlogForm = ({addBlog, handleNotification}) => {
    const [ title, setTitle] = useState('')
    const [ author, setAuthor] = useState('')
    const [ url, setUrl] = useState('')

    const add = async (event) => {
        event.preventDefault()
        try {
            await addBlog({title, author, url})
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            handleNotification(error)
        }
    }
    
    return (
        <div>
            <form onSubmit={add}>
                <div>
                    title: <input value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    author: <input value={author} onChange={(event) => setAuthor(event.target.value)} />
                </div>
                <div>
                    url: <input value={url} onChange={(event) => setUrl(event.target.value)} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default NewBlogForm