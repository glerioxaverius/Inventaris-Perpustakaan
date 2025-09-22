import { NextResponse } from "next/server";
import { Book } from "@/app/lib/types";

export let books: Book[] = [
    { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', isbn: '978-979-3062-79-2', publishedYear: 2005, status: 'tersedia' },
    { id: '2', title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', isbn: '978-979-97312-3-4', publishedYear: 1980, status: 'dipinjamkan' },
    { id: '3', title: 'Cantik Itu Luka', author: 'Eka Kurniawan', isbn: '978-979-22-8226-9', publishedYear: 2002, status: 'tersedia' },
];

export async function GET() {
    return NextResponse.json(books);
}

export async function POST(request: Request) {
    const newBook: Book = await request.json();
    newBook.id = (books.length + 1).toString();
    books.push(newBook);
    return NextResponse.json(newBook, {status: 201});
}