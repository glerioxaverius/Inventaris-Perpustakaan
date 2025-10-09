import { useRouter } from "next/navigation";
import { Book } from "../lib/types";
import Link from "next/link";

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
  onStatusChange: () => void;
}

const BookCard = ({ book, onDelete, onStatusChange }: BookCardProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        const response = await fetch(`/api/books/${book.id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Gagal menghapus buku");
        onDelete(book.id);
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus buku.");
      }
    }
  };

  const handleBorrow = async () => {
    const memberId = prompt(
      "Masukkan ID Anggota yang meminjam (contoh: P001):"
    );
    if (!memberId) return;

    try {
      const response = await fetch("api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book.id, memberId: memberId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal meminjam buku");
      }

      alert(`Buku "${book.title}" berhasil dipinjam oleh anggota ${memberId}`);
      onStatusChange();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleReturn = async () => {
    try {
      const response = await fetch("/api/transactions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book.id }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal mengembalikan buku");
      }

      alert(`Buku "${book.title}" berhasil dikembalikan.`);
      onStatusChange();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const statusClass = book.status === 'tersedia' ? 'bg-green-500' : 'bg-yellow-500';

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
      <div className="mt-4 flex flex-col gap-2">
        {/* Logika Tombol yang Diubah */}
        {book.status === "tersedia" ? (
          <button
            onClick={handleBorrow}
            className="w-full bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 text-sm"
          >
            Pinjam
          </button>
        ) : (
          <button
            onClick={handleReturn}
            className="w-full bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600 text-sm"
          >
            Kembalikan
          </button>
        )}
        <div className="flex gap-2">
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
    </div>
  );
};

export default BookCard;
