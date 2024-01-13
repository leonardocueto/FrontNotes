import React, { useState } from 'react'

function Note({ title, id, content, deleteNote }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleDeleteNote = () => {
        deleteNote(id)
        setIsMenuOpen(false)
    }

    return (
        <li
            className={`${
                isHovered ? 'relative' : 'none'
            } bg-white rounded p-4 m-3 text-center hover:shadow-md w-[500px] cursor-pointer`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>{title}</div>
            <div>{content}</div>
            {isHovered && (
                <div className=''>
                    <div className=' absolute p-1 top-0 right-0'>
                        <button
                            className='hover:bg-gray-200 rounded-full p-2 m-1'
                            onClick={handleMenuToggle}
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
                        <div className='bg-white w-40 rounded-md  border absolute top-10 right-0'>
                            <button
                                className='block p-1 hover:bg-gray-200 w-full'
                                onClick={() => console.log('Editar')}
                            >
                                Editar
                            </button>
                            <button
                                className='block p-1 hover:bg-gray-200 w-full'
                                onClick={handleDeleteNote}
                            >
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>
            )}
        </li>
    )
}

export default Note
