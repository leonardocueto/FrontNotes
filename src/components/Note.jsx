import React, { useState, useRef, useEffect } from 'react'

function Note({ title, id, content, deleteNote, category }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(content)
    const [newTitle, setNewTitle] = useState(title)
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [archived, setArchived] = useState(false)
    const [archiving, setArchiving] = useState(false)

    const textareaRef = useRef(null)

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleDeleteNote = () => {
        deleteNote(id)
        setIsMenuOpen(false)
    }

    const handleEditClick = () => {
        setIsEditing(true)
        setIsMenuOpen(false)
    }

    const handleSaveEdit = async () => {
        const updateNote = {
            name: newTitle,
            note: editedContent,
            categoryId: selectedCategory === 0 ? null : selectedCategory,
            archive: archived
        }
        await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(updateNote),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setIsEditing(false)
    }

    const handleArchivar = async () => {
        setArchiving(true)

        const updateNote = {
            name: newTitle,
            note: editedContent,
            categoryId: selectedCategory === 0 ? null : selectedCategory,
            archive: true
        }

        try {
            await fetch(`http://localhost:3000/api/notes/${id}`, {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(updateNote),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setArchived(true)
        } catch (error) {
            console.error('Error archiving note:', error)
        } finally {
            setArchiving(false)
        }
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setEditedContent(content)
        setNewTitle(title)
        setSelectedCategory(0)
    }

    useEffect(() => {
        if (isEditing) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [isEditing, editedContent])

    return (
        <li
            className={`${
                isHovered ? 'relative' : 'none'
            } bg-white rounded p-4 m-3 text-center hover:shadow-md w-[500px] cursor-pointer`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`${isHovered ? 'relative' : 'none'}`}>
                {isEditing ? (
                    <div className='flex'>
                        <input
                            type='text'
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            className='flex-grow font-semibold h-8 p-2 mb-2 border-none text-left focus:border-none outline-none'
                        />
                        <button
                            className='hover:bg-gray-200 rounded-full p-2 m-1'
                            onClick={handleMenuToggle}
                            name='menu'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-three-dots-vertical'
                                viewBox='0 0 16 16'
                            >
                                <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className='mb-3 ml-3 font-semibold pb-1 flex border-b '>
                        {title}
                    </div>
                )}
                {isEditing ? (
                    <div>
                        <textarea
                            ref={textareaRef}
                            value={editedContent}
                            onChange={e => setEditedContent(e.target.value)}
                            className='w-full p-2 mt-2 focus:border-none outline-none resize-none overflow-hidden text-gray-500 border-none'
                        />
                        {category.length > 0 && (
                            <select
                                className='px-3 py-1  rounded w-full'
                                name='categoryId'
                                value={selectedCategory}
                                onChange={e =>
                                    setSelectedCategory(+e.target.value)
                                }
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
                ) : (
                    <div className='flex pl-4 max-h-full text-gray-500 '>
                        {content}
                    </div>
                )}
                {isHovered && (
                    <>
                        <div className='absolute top-0 right-0'>
                            <button
                                className='hover:bg-gray-200 rounded-full p-2 m-1'
                                onClick={handleMenuToggle}
                                name='menu'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='currentColor'
                                    className='bi bi-three-dots-vertical'
                                    viewBox='0 0 16 16'
                                >
                                    <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
                                </svg>
                            </button>
                        </div>
                        {isMenuOpen && (
                            <div className='bg-white rounded-md border w-32 absolute top-10 right-0 '>
                                {isEditing ? (
                                    <>
                                        <button
                                            className='block p-1 hover:bg-gray-200 w-full'
                                            onClick={handleSaveEdit}
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            className='block p-1 hover:bg-gray-200 w-full'
                                            onClick={handleCancelEdit}
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className='block p-1 hover:bg-gray-200 w-full'
                                        onClick={handleEditClick}
                                    >
                                        Editar
                                    </button>
                                )}
                                <button
                                    className='p-1 hover:bg-gray-200 w-full'
                                    onClick={handleDeleteNote}
                                >
                                    Eliminar
                                </button>
                                <button
                                    className='p-1 hover:bg-gray-200 w-full'
                                    onClick={handleArchivar}
                                    disabled={archiving}
                                >
                                    Archivar
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </li>
    )
}

export default Note
