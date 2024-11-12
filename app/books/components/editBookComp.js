import { Button } from "antd";

export const BookEditForm = ({ book, setBook, onSave }) => {
    return (
        <div>
            <div className=" mb-5">
                <label className=" block text-sm font-medium text-gray-700">Title</label>
                <input 
                    type="text" 
                    className=" mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" 
                    value={book.title}
                    onChange={(e) => setBook({ ...book, title: e.target.value })}
                />
            </div>
            <div className=" mb-5">
                <label className=" block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                    className=" mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" 
                    value={book.description}
                    onChange={(e) => setBook({ ...book, description: e.target.value })}
                />
            </div>
            <div className=" mb-5">
                <label className=" block text-sm font-medium text-gray-700">Published Date</label>
                <input 
                    type="date" 
                    className=" mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" 
                    value={new Date(book.publishedDate).toISOString().split('T')[0]}
                    onChange={(e) => setBook({ ...book, publishedDate: new Date(e.target.value).toISOString() })}
                />
            </div>
            <div className=" flex flex-row justify-end">
                <Button type="primary" onClick={onSave}>Save</Button>
            </div>
        </div>
    );
}
