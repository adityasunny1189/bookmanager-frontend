'use client';

import { Button, Drawer } from "antd";
import { useState } from "react";
import { Book } from "./components/bookComp";
import { BookEditForm } from "./components/editBookComp";
import { redirect } from "next/navigation";
import AddBookComp from "./components/addBookComp";
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_BOOKS = gql`
    query GetBooks($filter: String, $page: Int, $limit: Int) {
        getBooks(filter: $filter, page: $page, limit: $limit) {
            books {
                id
                title
                publishedDate
                description
                authors {
                    id
                    name
                }
                reviewsAndRating {
                    review
                    rating
                }
            }
            currentPage
            totalPage
        }
    }
`;

const CREATE_BOOK = gql`
    mutation Mutation($title: String!, $description: String!, $publishedDate: Date!) {
        createBook(title: $title, description: $description, publishedDate: $publishedDate) {
            id
            title
            description
            publishedDate
        }
    }
`;

const DELETE_BOOK = gql`
mutation DeleteBook($deleteBookId: ID!) {
  deleteBook(id: $deleteBookId) {
    description
    authors {
      name
      id
    }
    id
    publishedDate
    title
  }
}
`;

const UPDATE_BOOK = gql`
mutation UpdateBook($updateBookId: ID!, $updateBookTitle2: String, $updateBookDescription2: String) {
  updateBook(id: $updateBookId, title: $updateBookTitle2, description: $updateBookDescription2) {
    id
    publishedDate
    title
    description
  }
}
`;

export default function BookComp() {
    const [book, setBook] = useState({
        id: null,
        title: '',
        description: '',
        publishedDate: null
    });
    const [open, setOpen] = useState(false);
    const [adBook, setAdBook] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState('Edit Book');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [publishedDate, setPublishedDate] = useState(null);

    const { loading, error, data, refetch } = useQuery(GET_BOOKS);
    const [createBook] = useMutation(CREATE_BOOK);
    const [deleteBook] = useMutation(DELETE_BOOK);
    const [updateBook] = useMutation(UPDATE_BOOK);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const openBook = (book) => {
        console.log("Book: ", book);
        redirect(`/books/${book.id}`);
    };

    const onClose = () => {
        setOpen(false);
    };

    async function deleteBookHandler(book) {
        let confirm = window.confirm('Are you sure you want to delete this book?');
        console.log('Delete book', book);
        if(confirm) {
            await deleteBook({
                variables: {
                    deleteBookId: book.id
                }
            });
            await refetch();
        }
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString('en-GB');
    }

    function editBook(book) {
        console.log('Edit book', book);
        console.log("Published Date: ", formatDate(book.publishedDate));
        setDrawerTitle('Edit Book');
        setAdBook(false);
        setBook(book);
        setOpen(true);
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
        await createBook({
            variables: {
                title: title,
                description: description,
                publishedDate: publishedDate
            }
        });
        await refetch();
    }

    async function updateBookHandler(book) {
        console.log('Update book');
        console.log("TItle: ", book.title);
        console.log("Description: ", book.description);
        console.log("Published Date: ", book.publishedDate);
        await updateBook({
            variables: {
                updateBookId: book.id,
                updateBookTitle2: book.title,
                updateBookDescription2: book.description
            }
        });
        await refetch();
    }

    return (
        <div>
            <div className=" flex flex-row justify-between">
                <h1 className=" text-xl mb-5">Book Library</h1>
                <Button type="primary" onClick={addBook}>Add Book</Button>
            </div>
            <div className=" flex flex-wrap">
                {data.getBooks.books.map((book) => {
                    return (
                        <div className=" w-1/5 px-2 my-4" key={book.id}>
                            <Book 
                                book={book}
                                deleteBook={deleteBookHandler}
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
                    <BookEditForm 
                        book={book} 
                        setBook={setBook}
                        onSave={() => updateBookHandler(book)}
                    />
                }
            </Drawer>
        </div>
    )
};
