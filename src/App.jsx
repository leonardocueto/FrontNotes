import { useEffect, useState } from 'react'
import Buscador from './components/Buscador'
import ListNotes from './components/ListNotes'
import NewNote from './components/NewNote'
import Note from './components/Note'
import ModalCategory from './components/ModalCategory'
import IconExistNotes from './components/icons/IconExistNotes'
import IconBook from './components/icons/IconBook'

function App() {
    const [notes, setNotes] = useState([])
    const [category, setCategory] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showArchived, setShowArchived] = useState(false)

    const getNotes = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/notes?archive=${showArchived}`
            )

            if (!res.ok) {
                throw new Error('Error al obtener las notas')
            }

            const data = await res.json()
            const filteredNotes = showArchived
                ? data
                : data.filter(note => !note.archive)
            setNotes(filteredNotes)
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
    }, [showArchived, category])
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
                            className={`w-full p-4 rounded-r-full   ${
                                showArchived === false
                                    ? 'bg-blue-100 hover:bg-none'
                                    : 'hover:bg-gray-200'
                            } flex items-center justify-stretch`}
                            onClick={() => {
                                setShowArchived(false)
                            }}
                        >
                            <IconBook />
                            <span className='pl-6'>Notes</span>
                        </button>
                        <button
                            className=' w-full p-4 rounded-r-full hover:bg-gray-200 flex items-center justify-stretch'
                            onClick={toggleModal}
                        >
                            <IconBook />
                            <span className='pl-6'>Category</span>
                        </button>
                        <button
                            className={`w-full p-4 rounded-r-full flex items-center justify-stretch ${
                                showArchived === true
                                    ? 'bg-blue-100 hover:bg-none'
                                    : 'hover:bg-gray-200'
                            }`}
                            onClick={() => {
                                setShowArchived(true)
                            }}
                        >
                            <IconBook />
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
                                        <IconExistNotes />
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
