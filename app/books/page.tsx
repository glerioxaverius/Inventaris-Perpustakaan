"use client";

import { useState, useEffect } from "react";
import BookCard from "../Component/BookCard";
import { Book } from "../lib/types";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Gagal mengambil data buku: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>memuat data buku...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Daftar Buku</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
