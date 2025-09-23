"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BookCard from "../Component/BookCard";
import { Book } from "../lib/types";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookDeleted = (deletedBookId: string) => {
    setBooks(books.filter((book) => book.id !== deletedBookId));
  };

  const refreshBooks = () => {
    setLoading(true);
    fetchBooks();
  };

  if (loading) {
    return <p>memuat data buku...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Buku</h1>
        <Link
          href="/books/add"
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          + Tambah Buku
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDelete={handleBookDeleted}
            onStatusChange={refreshBooks}
          />
        ))}
      </div>
    </div>
  );
}
