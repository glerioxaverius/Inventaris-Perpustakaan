import { Book } from "../lib/types";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const statusclass =
    book.status === "tersedia" ? "bg-green-500" : "bg-yellow-500";

  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-600">oleh {book.author}</p>
      <p className="text-sm text-gray-500 mt-2">ISBN: {book.isbn}</p>
      <div className="mt-4">
        <span
          className={"px-2 py-1 text-xs text-white rounded-full ${statusClass}"}
        >
          {book.status}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
