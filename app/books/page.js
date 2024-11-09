'use client';

import { Button, Drawer } from "antd";
import { useState } from "react";
import { Book } from "./components/bookComp";
import { BookEditForm } from "./components/editBookComp";
import { redirect } from "next/navigation";
import AddBookComp from "./components/addBookComp";


export default function BookComp() {
    // const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});
    const [open, setOpen] = useState(false);
    const [adBook, setAdBook] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState('Edit Book');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [publishedDate, setPublishedDate] = useState(null);

    const openBook = (book) => {
        console.log("Book: ", book);
        // navigate
        redirect(`/books/${book.id}`);
    };

    const onClose = () => {
        setOpen(false);
    };

    const books = [
        {
            id: 1,
            title: 'Book 1',
            description: 'Description 1',
            publishedDate: '2021-01-01'
        },
        {
            id: 2,
            title: 'Book 2',
            description: 'Description 2',
            publishedDate: '2021-01-02'
        },
        {
            id: 3,
            title: 'Book 1',
            description: 'Description 1',
            publishedDate: '2021-01-01'
        },
        {
            id: 4,
            title: 'Book 2',
            description: 'Description 2',
            publishedDate: '2021-01-02'
        },
        {
            id: 5,
            title: 'Book 1',
            description: 'Description 1',
            publishedDate: '2021-01-01'
        },
        {
            id: 6,
            title: 'Book 2',
            description: 'Description 2',
            publishedDate: '2021-01-02'
        }
    ];

    function deleteBook(book) {
        let confirm = window.confirm('Are you sure you want to delete this book?');
        console.log('Delete book', book);
    }

    function editBook(book) {
        setBook(book);
        setOpen(true);
        console.log('Edit book', book);
    }

    function addBook() {
        console.log('Add book');
        setDrawerTitle('Add Book');
        setAdBook(true);
        setOpen(true);
    }

    async function createNewBook() {
        console.log('Create new book');
        console.log("TItle: ", title);
        console.log("Description: ", description);
        console.log("Published Date: ", publishedDate);
    }

    return (
        <div>
            <div className=" flex flex-row justify-between">
                <h1 className=" text-xl mb-5">Book Library</h1>
                <Button type="primary" onClick={addBook}>Add Book</Button>
            </div>
            <div className=" flex flex-wrap">
                {books.map((book) => {
                    return (
                        <div className=" w-1/5 px-2 my-4" key={book.id}>
                            <Book 
                                book={book}
                                deleteBook={deleteBook}
                                editBook={editBook}
                                openBook={openBook}
                            />
                        </div>
                    )
                })}
            </div>
            <Drawer 
                width={640} 
                title={drawerTitle}
                onClose={onClose} 
                open={open}
            >
                {adBook ? 
                    <AddBookComp 
                        title={title} 
                        setTitle={setTitle}
                        description={description} 
                        setDescription={setDescription}
                        publishedDate={publishedDate} 
                        setPublishedDate={setPublishedDate}
                        onSave={createNewBook} 
                    /> : 
                    <BookEditForm book={book} />
                }
            </Drawer>
        </div>
    )
};
