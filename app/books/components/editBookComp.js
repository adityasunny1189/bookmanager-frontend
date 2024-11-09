export const BookEditForm = ({ book, onSave }) => {
    return (
        <form onSubmit={onSave}>
            <label>
                Title:
                <input type="text" name="title" defaultValue={book.title} />
            </label>
            <label>
                Description:
                <textarea name="description" defaultValue={book.description} />
            </label>
            <button type="submit">Save</button>
        </form>
    );
}
