import { NextResponse } from 'next/server';
import { members } from '../route';

// Handler untuk GET (mengambil satu anggota)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Perbaikan di sini
  const member = members.find((m) => m.id === id);

  if (!member) {
    return NextResponse.json({ message: 'Anggota tidak ditemukan' }, { status: 404 });
  }
  return NextResponse.json(member);
}

// Handler untuk PUT (mengupdate anggota)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Perbaikan di sini
  const index = members.findIndex((m) => m.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Anggota tidak ditemukan' }, { status: 404 });
  }

  const updatedData = await request.json();
  members[index] = { ...members[index], ...updatedData };

  return NextResponse.json(members[index]);
}

// Handler untuk DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Perbaikan di sini
  const index = members.findIndex((m) => m.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Anggota tidak ditemukan' }, { status: 404 });
  }

  members.splice(index, 1);
  return NextResponse.json({ message: 'Anggota berhasil dihapus' }, { status: 200 });
}