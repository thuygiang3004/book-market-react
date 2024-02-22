import {IBook} from "../Pages/AllListings";

export const BookLists = ({books}: { books: IBook[] }) => {
    return <div>
        <p>Book: </p>
        <ul className="ml-4 list-disc text-gray-500 text-sm">
            {books.map((book) => <li key={book.id}>{book.title}</li>)}
        </ul>
    </div>

}