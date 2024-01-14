import { useState, useRef } from 'react'
import IconTrash from './icons/IconTrash'
import IconPencil from './icons/IconPencil'

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
                            required
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
                                    <IconTrash />
                                </button>
                                <span className='text-lg font-semibold'>
                                    {category.name}
                                </span>
                                <button
                                    name='edit'
                                    className='hover:bg-gray-100 px-2 py-1 rounded-md'
                                    onClick={() => handleEditClick(category.id)}
                                >
                                    <IconPencil
                                        width={20}
                                        height={20}
                                    />
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
