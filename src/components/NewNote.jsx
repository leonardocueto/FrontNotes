import { useState } from 'react'

function NewNote({ category }) {
    const [note, setNote] = useState({
        name: '',
        note: '',
        categoryId: undefined,
        archive: false
    })
    const [isExpanded, setIsExpanded] = useState(false)

    const handleChange = e => {
        let value = e.target.value
        if (e.target.name === 'categoryId') {
            value = +value
        }
        setNote({ ...note, [e.target.name]: value })
    }

    const saveNote = async () => {
        await fetch('http://localhost:3000/api/notes', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        saveNote()
        setNote({
            name: '',
            note: '',
            categoryId: undefined,
            archive: false
        })
    }
    const handleFocus = () => {
        setIsExpanded(true)
    }
    const handleBlur = () => {
        setIsExpanded(false)
    }

    return (
        <div className='p-4 m-4 rounded-md shadow-2xl bg-white flex flex-col'>
            <form onSubmit={handleSubmit}>
                <div className='mb-2 flex'>
                    <div className='w-full'>
                        <input
                            required
                            type='text'
                            name='name'
                            onChange={handleChange}
                            value={note.name}
                            placeholder='Title'
                            className='p-2 text-2xl border rounded-l-md focus:border-none outline-none border-none focus:outline-none w-full'
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>

                <div className='w-full'>
                    <textarea
                        required
                        placeholder='Create a note...'
                        name='note'
                        value={note.note}
                        className={`p-2 border rounded-b-md resize-none transition-all duration-500 ease-in-out ${
                            isExpanded ? 'h-80' : 'h-20'
                        } focus:border-none outline-none border-none focus:outline-none w-full`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        cols='60'
                        rows='5'
                    ></textarea>
                </div>
                <div className='flex'>
                    <div className='w-1/2'>
                        {category.length > 0 && (
                            <select
                                value={note.categoryId}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className='px-3 py-1 border rounded w-full'
                                name='categoryId'
                            >
                                <option value={0}>Select category</option>
                                {category.map(({ name, id }) => (
                                    <option
                                        key={id}
                                        value={id}
                                    >
                                        {name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <button className='self-end px-4 py-2 rounded transition-all duration-300 ease-in-out hover:bg-gray-100 ml-auto'>
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    )
}
export default NewNote
