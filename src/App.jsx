import { useEffect, useState } from 'react'
import Buscador from './components/Buscador'
import ListNotes from './components/ListNotes'
import NewNote from './components/NewNote'
import Note from './components/Note'
import ModalCategory from './components/ModalCategory'
import IconExistNotes from './components/icons/IconExistNotes'
import IconBook from './components/icons/IconBook'
import IconPencil from './components/icons/IconPencil'
import IconArchive from './components/icons/IconArchive'
import IconNote from './components/icons/IconNote'

function App() {
    const [notes, setNotes] = useState([])
    const [category, setCategory] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showArchived, setShowArchived] = useState(false)
    const [selectedCategoryId, setSelectedCategoryId] = useState(0)
    const [search, setSearch] = useState('')

    const URLNOTES = 'https://backnotes-c1o6.onrender.com/api/notes'
    const URLCATEGORIES = 'https://backnotes-c1o6.onrender.com/api/categories'
    const getNotes = async () => {
        try {
            const res = await fetch(URLNOTES)

            if (!res.ok) {
                throw new Error('Error al obtener las notas')
            }
            const data = await res.json()
            const filteredNotes = data.filter(note => {
                const matchesTitle = note.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                const matchesArchive = showArchived
                    ? note.archive
                    : !note.archive
                const matchesCategory =
                    selectedCategoryId === 0 ||
                    note.categoryId === selectedCategoryId

                return matchesTitle && matchesArchive && matchesCategory
            })

            setNotes(filteredNotes)
        } catch (error) {
            console.error('Error:', error.message)
        }
    }
    const getCategory = async () => {
        const res = await fetch(URLCATEGORIES)
        const data = await res.json()
        setCategory(data)
    }

    const deleteNote = async id => {
        await fetch(`${URLNOTES}/${id}`, {
            method: 'DELETE',
            mode: 'cors'
        })
    }

    const deleteCategory = async id => {
        await fetch(`${URLCATEGORIES}/${id}`, {
            method: 'DELETE',
            mode: 'cors'
        })
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    const handleSearch = busqueda => {
        setSearch(busqueda)
    }

    useEffect(() => {
        getNotes()
        getCategory()
    }, [showArchived, category, search])

    return (
        <>
            <div className='flex flex-col h-screen'>
                <nav className='flex justify-between items-center h-14 bg-blue-50 rounded-sm'>
                    <div className='ml-0 pl-4 flex items-center'>
                        <IconNote
                            width={40}
                            height={40}
                        />
                        <span className='ml-2 pl-2 font-semibold'>
                            Mis Notas
                        </span>
                    </div>
                    <div className='flex  justify-center items-center'>
                        <div className='flex w-[500px] relative'>
                            <Buscador onSearch={handleSearch} />
                        </div>
                        <div>
                            {category.length > 0 && (
                                <select
                                    className='ml-1 px-3 py-2 border-none rounded w-full shadow-md'
                                    name='filterCategory'
                                    value={selectedCategoryId}
                                    onChange={e =>
                                        setSelectedCategoryId(
                                            parseInt(e.target.value)
                                        )
                                    }
                                >
                                    <option value={0}>
                                        Filtrar por categoría
                                    </option>
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
                    </div>
                    <div className='mr-4'>Cerrar sesión</div>
                </nav>

                <div className='flex flex-1 bg-gray-50 overflow-hidden'>
                    <aside className='w-64 bg-gray-100  relative'>
                        <button
                            className={`w-full p-2 rounded-r-full   ${
                                showArchived === false
                                    ? 'bg-blue-100 hover:bg-none'
                                    : 'hover:bg-gray-200'
                            } flex items-center justify-stretch`}
                            onClick={() => {
                                setShowArchived(false)
                            }}
                        >
                            <IconBook
                                width={30}
                                height={30}
                            />
                            <span className='pl-6'>Notes</span>
                        </button>
                        <button
                            className=' w-full p-2 rounded-r-full hover:bg-gray-200 flex items-center justify-stretch'
                            onClick={toggleModal}
                        >
                            <IconPencil
                                width={30}
                                height={30}
                            />
                            <span className='pl-6'>Category</span>
                        </button>
                        <button
                            className={`w-full p-2 rounded-r-full flex items-center justify-stretch ${
                                showArchived === true
                                    ? 'bg-blue-100 hover:bg-none'
                                    : 'hover:bg-gray-200'
                            }`}
                            onClick={() => {
                                setShowArchived(true)
                            }}
                        >
                            <IconArchive
                                width={30}
                                height={30}
                            />
                            <span className='pl-6'>Archived</span>
                        </button>
                        {isModalOpen && (
                            <ModalCategory
                                onClose={toggleModal}
                                category={category}
                                deleteCategory={deleteCategory}
                                url={URLCATEGORIES}
                            />
                        )}
                    </aside>
                    <main className='flex-1  gap-2 rounded-sm overflow-y-auto'>
                        <div className='flex flex-col items-center justify-center'>
                            <NewNote
                                url={URLNOTES}
                                category={category}
                            />
                        </div>
                        <div className='mx-10'>
                            {notes.length > 0 ? (
                                <ListNotes>
                                    {notes.map(
                                        ({ name, note, id, archive }) => (
                                            <Note
                                                key={id}
                                                title={name}
                                                content={note}
                                                id={id}
                                                deleteNote={deleteNote}
                                                archive={archive}
                                                category={category}
                                                url={URLNOTES}
                                            />
                                        )
                                    )}
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
