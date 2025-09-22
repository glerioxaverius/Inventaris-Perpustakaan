"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book } from "@/app/lib/types";

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({ title: "", author: "", isbn: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBookData = async () => {
        try {
          const response = await fetch(`/api/books/${id}`);
          if (!response.ok) throw new Error("Gagal mengambil data buku");
          const data = await response.json();
          setBook(data);
          setFormData({
            title: data.title,
            author: data.author,
            isbn: data.isbn,
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchBookData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Gagal menyimpan perubahan");
      alert("Perubahan berhasil disimpan!");
      router.push("/books");
    } catch (error) {
      alert("Gagal menyimpan perubahan.");
    }
  };

  if (loading) return <p>Memuat...</p>;
  if (!book) return <p>Buku tidak ditemukan.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Buku</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Judul
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium">
            Penulis
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium">
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
