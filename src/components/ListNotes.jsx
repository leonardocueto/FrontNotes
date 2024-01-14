function ListNotes({ children }) {
    return (
        <ol className='flex flex-col items-center justify-center gap-2'>
            {children}
        </ol>
    )
}

export default ListNotes
