import { useEffect, useState } from 'react'
import Buscador from './components/Buscador'
import ListNotes from './components/ListNotes'
import NewNote from './components/NewNote'
import Note from './components/Note'
import ModalCategory from './components/ModalCategory'

function App() {
    const [notes, setNotes] = useState([])
    const [category, setCategory] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const getNotes = async () => {
        try {
            const res = await fetch(
                'http://localhost:3000/api/notes?archive=false'
            )

            if (!res.ok) {
                throw new Error('Error al obtener las notas')
            }

            const data = await res.json()
            const notesWitoutArchive = data.filter(
                noteWithouthArchive => noteWithouthArchive.archive !== true
            )
            setNotes(notesWitoutArchive)
        } catch (error) {
            console.error('Error:', error.message)
        }
    }
    const getCategory = async () => {
        const res = await fetch('http://localhost:3000/api/categories')
        const data = await res.json()
        setCategory(data)
    }

    const deleteNote = async id => {
        await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: 'DELETE',
            mode: 'cors'
        })
    }

    const deleteCategory = async id => {
        await fetch(`http://localhost:3000/api/categories/${id}`, {
            method: 'DELETE',
            mode: 'cors'
        })
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    useEffect(() => {
        getNotes()
        getCategory()
    }, [notes])
    return (
        <>
            <div className='h-screen flex flex-col'>
                <nav className='flex justify-center items-center h-14 bg-blue-50 rounded-sm'>
                    <div className='mx-auto'>icon</div>
                    <div className='mx-auto'>
                        <Buscador />
                    </div>
                    <div className='mx-auto'>logout</div>
                </nav>
                <div className='flex flex-1 bg-gray-50 overflow-hidden'>
                    <aside className='w-64 bg-gray-100  relative'>
                        <button
                            className=' w-full p-4 rounded-r-full hover:bg-gray-200 flex items-center justify-stretch'
                            onClick={toggleModal}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-book-2'
                                width='35'
                                height='35'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='#2c3e50'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path
                                    stroke='none'
                                    d='M0 0h24v24H0z'
                                    fill='none'
                                />
                                <path d='M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z' />
                                <path d='M19 16h-12a2 2 0 0 0 -2 2' />
                                <path d='M9 8h6' />
                            </svg>
                            <span className='pl-6'>Notes</span>
                        </button>
                        <button
                            className=' w-full p-4 rounded-r-full hover:bg-gray-200 flex items-center justify-stretch'
                            onClick={toggleModal}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-book-2'
                                width='35'
                                height='35'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='#2c3e50'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path
                                    stroke='none'
                                    d='M0 0h24v24H0z'
                                    fill='none'
                                />
                                <path d='M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z' />
                                <path d='M19 16h-12a2 2 0 0 0 -2 2' />
                                <path d='M9 8h6' />
                            </svg>
                            <span className='pl-6'>Category</span>
                        </button>
                        <button
                            className=' w-full p-4 rounded-r-full hover:bg-gray-200 flex items-center justify-stretch'
                            onClick={toggleModal}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-book-2'
                                width='35'
                                height='35'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='#2c3e50'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path
                                    stroke='none'
                                    d='M0 0h24v24H0z'
                                    fill='none'
                                />
                                <path d='M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z' />
                                <path d='M19 16h-12a2 2 0 0 0 -2 2' />
                                <path d='M9 8h6' />
                            </svg>
                            <span className='pl-6'>Archived</span>
                        </button>
                        {isModalOpen && (
                            <ModalCategory
                                onClose={toggleModal}
                                category={category}
                                deleteCategory={deleteCategory}
                            />
                        )}
                    </aside>
                    <main className='flex-1  gap-2 rounded-sm overflow-y-auto'>
                        <div className='flex flex-col items-center justify-center'>
                            <NewNote category={category} />
                        </div>
                        <div className='mx-10'>
                            {notes.length > 0 ? (
                                <ListNotes>
                                    {notes.map(({ name, note, id }) => (
                                        <Note
                                            key={id}
                                            title={name}
                                            content={note}
                                            id={id}
                                            deleteNote={deleteNote}
                                            category={category}
                                        />
                                    ))}
                                </ListNotes>
                            ) : (
                                <div className='flex flex-col justify-center items-center mt-20'>
                                    <div>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='icon icon-tabler icon-tabler-zoom-scan'
                                            width='100'
                                            height='100'
                                            viewBox='0 0 24 24'
                                            strokeWidth='1.5'
                                            stroke='#2c3e50'
                                            fill='none'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        >
                                            <path
                                                stroke='none'
                                                d='M0 0h24v24H0z'
                                                fill='none'
                                            />
                                            <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
                                            <path d='M4 16v2a2 2 0 0 0 2 2h2' />
                                            <path d='M16 4h2a2 2 0 0 1 2 2v2' />
                                            <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
                                            <path d='M8 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' />
                                            <path d='M16 16l-2.5 -2.5' />
                                        </svg>
                                    </div>
                                    <p className='text-2xl font-semibold'>
                                        no existen notas
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default App
