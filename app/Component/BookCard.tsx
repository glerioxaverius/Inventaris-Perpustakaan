import { Book } from "../lib/types";
import Link from "next/link";

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
}

const BookCard = ({ book, onDelete }: BookCardProps) => {
  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        const response = await fetch(`/api/books/${book.id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Gagal menghapus buku");
        onDelete(book.id); // Panggil fungsi dari induk untuk update UI
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus buku.");
      }
    }
  };

  const statusClass =
    book.status === "tersedia" ? "bg-green-500" : "bg-yellow-500";

  return (
    <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold">{book.title}</h3>
        <p className="text-gray-600">oleh {book.author}</p>
        <p className="text-sm text-gray-500 mt-2">ISBN: {book.isbn}</p>
        <div className="mt-4">
          <span
            className={`px-2 py-1 text-xs text-white rounded-full ${statusClass}`}
          >
            {book.status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link
          href={`/books/edit/${book.id}`}
          className="w-full bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm text-center"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default BookCard;
