import { NextResponse } from "next/server";
import { Transaction } from "@/app/lib/types";
import { books } from "../books/route";
import { members } from "../members/route";

let transactions: Transaction[] = [];

export async function POST(request: Request) {
    try {
        const {bookId, memberId} = await request.json();

        if (!bookId || !memberId) {
            return NextResponse.json({ message:'ID Buku dan ID Anggota diperlukan' }, {status: 400});
        }

        const book = books.find((b) => b.id === bookId);
        const member = members.find((m) => m.memberId === memberId);

        if (!member) {
      return NextResponse.json({ message: 'Anggota tidak ditemukan' }, { status: 404 });
    }
    if (!book) {
      return NextResponse.json({ message: 'Buku tidak ditemukan' }, { status: 404 });
    }

    if (book.status === 'dipinjamkan') {
      return NextResponse.json({ message: 'Buku sedang dipinjam' }, { status: 409 }); // 409 Conflict
    }

    book.status = 'dipinjamkan';

    const newTransaction: Transaction = {
        id: `T${transactions.length + 1}`,
        bookId,
        memberId,
        borrowDate: new Date().toISOString(),
    };
    transactions.push(newTransaction);

    return NextResponse.json(newTransaction,  {status: 201});

    } catch (error) {
        return NextResponse.json({message: 'Terjadi kesalahan pada server'}, {status: 500});
    }
}

export async function PUT(request: Request) {
        try {
            const {bookId} = await request.json();

            if (!bookId) {
                return NextResponse.json({message: 'ID Buku diperlukan'}, {status: 400});
            }

            const book = books.find((b) => b.id === bookId);
            if (!book) {
                return NextResponse.json({message: 'Buku tidak ditemukan'}, {status: 404});
            }

            const activeTransaction = transactions.find(
                (t) => t.bookId === bookId && !t.returnDate
            );
            if (!activeTransaction) {
                return NextResponse.json({message: 'Buku ini tidak sedang dalam status dipinjam'}, {status: 404});
            }

            book.status = 'tersedia';

            activeTransaction.returnDate = new Date().toISOString();

            return NextResponse.json(activeTransaction);
        } catch(error) {
            return NextResponse.json({message: 'Terjadi kesalahan pada server'}, {status: 500});
        }
    }