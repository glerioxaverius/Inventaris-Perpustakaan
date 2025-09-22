import { NextResponse } from 'next/server';
import { books } from '@/app/api/books/route'; 

export async function GET(
  request: Request,
  {params}: {params: {id: string}}
) {
  const id = params.id;
  const book = books.find((b) => b.id === id);

  if (!book) {
    return NextResponse.json({message: 'Buku tidak ditemukan'}, {status: 404});
  }

  return NextResponse.json(book);
}

export async function PUT(
  request: Request,
  {params}: {params: {id:string}}
) {
  const id = params.id;
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return NextResponse.json({message: 'Buku tidak ditemukan'}, {status: 404});
  }

  const updateData = await request.json();
  books[index] = {...books[index], ...updateData};

  return NextResponse.json(books[index]);
} 

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Buku tidak ditemukan' }, { status: 404 });
  }

  books.splice(index, 1);

  return NextResponse.json({ message: 'Buku berhasil dihapus' }, { status: 200 });
}