import { useState } from 'react'
import IconCross from './icons/IconCross'

const Buscador = ({ onSearch }) => {
    const [search, setSearch] = useState('')

    const handleSearch = e => {
        setSearch(e.target.value)
        onSearch(search)
    }
    const handleClear = () => {
        setSearch('')
        onSearch('')
    }

    return (
        <>
            <button
                className={`absolute  right-0 top-1/2 transform -translate-y-1/2 ${
                    search.length > 0
                        ? 'hover:bg-gray-200 rounded-full p-1 px-1 '
                        : 'hidden'
                }`}
                onClick={handleClear}
            >
                <IconCross />
            </button>
            <input
                type='text'
                placeholder='Buscar por título'
                className='w-full rounded-md p-2 shadow-md focus:border-none outline-none border-none focus:outline-none'
                value={search}
                onChange={e => handleSearch(e)}
            />
        </>
    )
}

export default Buscador
