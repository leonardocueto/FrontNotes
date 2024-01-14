import { useState, useRef } from 'react'

const ModalCategory = ({ onClose, category, deleteCategory }) => {
    const [editingCategoryId, setEditingCategoryId] = useState(null)
    const categoryInputRef = useRef()

    const handleSubmit = async e => {
        e.preventDefault()
        const name = categoryInputRef.current.value

        if (editingCategoryId !== null) {
            await updateCategory(editingCategoryId, name)
            setEditingCategoryId(null)
        } else {
            await saveCategory(name)
        }

        categoryInputRef.current.value = ''
    }

    const saveCategory = async name => {
        await fetch('http://localhost:3000/api/categories', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const updateCategory = async (categoryId, name) => {
        await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const handleEditClick = categoryId => {
        setEditingCategoryId(categoryId)
        const categoryToEdit = category.find(c => c.id === categoryId)
        categoryInputRef.current.value = categoryToEdit.name
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div
                className='bg-black bg-opacity-50 absolute inset-0'
                onClick={onClose}
            ></div>
            <div className='bg-white p-8 rounded-lg z-10'>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-xl font-semibold mb-4'>
                        {editingCategoryId !== null
                            ? 'Edit category'
                            : 'New category'}
                    </h2>
                    <div className='mb-4'>
                        <input
                            type='text'
                            name='category'
                            ref={categoryInputRef}
                            className='mt-1 p-2 w-full border rounded-md'
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                        >
                            {editingCategoryId !== null ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
                <div>
                    <ul className='p-2'>
                        {category.map(category => (
                            <li
                                key={category.id}
                                className='flex items-center justify-between mb-2'
                            >
                                <button
                                    className='px-2 py-1 rounded-md hover:bg-gray-100'
                                    onClick={() => deleteCategory(category.id)}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='icon icon-tabler icon-tabler-trash'
                                        width='20'
                                        height='20'
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
                                        <path d='M4 7l16 0' />
                                        <path d='M10 11l0 6' />
                                        <path d='M14 11l0 6' />
                                        <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                                        <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                                    </svg>
                                </button>
                                <span className='text-lg font-semibold'>
                                    {category.name}
                                </span>
                                <button
                                    name='edit'
                                    className='hover:bg-gray-100 px-2 py-1 rounded-md'
                                    onClick={() => handleEditClick(category.id)}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='icon icon-tabler icon-tabler-pencil'
                                        width='20'
                                        height='20'
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
                                        <path d='M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4' />
                                        <path d='M13.5 6.5l4 4' />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ModalCategory
