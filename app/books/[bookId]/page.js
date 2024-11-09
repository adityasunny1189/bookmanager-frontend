export default async function BookInfo({ params }) {
    const bookId = (await params).bookId;

    console.log("bookId: ", bookId);

    const book = {
        title: "The Great Gatsby",
        description: "The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.",
        authors: [
            {
                id: 1,
                name: "F. Scott Fitzgerald"
            },
            {
                id: 2,
                name: "Author 2"
            }
        ]
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <h2>Authors</h2>
            <ul>
                {book.authors.map(author => (
                    <li key={author.id}>{author.name}</li>
                ))}
            </ul>
        </div>
    );
};

