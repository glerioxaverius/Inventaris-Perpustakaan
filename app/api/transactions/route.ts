import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const { bookId, memberId } = await request.json();

    if (!bookId || !memberId) {
      return NextResponse.json({ message: 'ID Buku dan ID Anggota diperlukan' }, { status: 400 });
    }

    const { data: member, error: memberError } = await supabase
      .from('Members')
      .select('id') 
      .eq('unique_member_id', memberId) 
      .single();

    if (memberError || !member) {
      return NextResponse.json({ message: 'Anggota tidak ditemukan' }, { status: 404 });
    }

    const { data: book, error: bookError } = await supabase
      .from('Books')
      .select('id, status')
      .eq('id', bookId)
      .single();
    
    if (bookError || !book) {
      return NextResponse.json({ message: 'Buku tidak ditemukan' }, { status: 404 });
    }

    if (book.status === 'dipinjam') {
      return NextResponse.json({ message: 'Buku sedang dipinjam' }, { status: 409 });
    }

    const { error: updateBookError } = await supabase
      .from('Books')
      .update({ status: 'dipinjam' })
      .eq('id', bookId);

    if (updateBookError) throw updateBookError;

    // 6. Buat transaksi baru di tabel Transactions
    const { data: newTransaction, error: insertTransactionError } = await supabase
      .from('Transactions')
      .insert({ book_id: book.id, member_id: member.id }) // Gunakan UUID
      .select()
      .single();
    
    if (insertTransactionError) throw insertTransactionError;

    return NextResponse.json(newTransaction, { status: 201 });

  } catch (error: any) {
    console.error("Transaction Error:", error);
    return NextResponse.json({ message: error.message || 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}


// Fungsi untuk mengupdate transaksi (mengembalikan buku)
export async function PUT(request: Request) {
  try {
    const { bookId } = await request.json();
    if (!bookId) {
      return NextResponse.json({ message: 'ID Buku diperlukan' }, { status: 400 });
    }

    // 1. Update status buku menjadi 'tersedia'
    const { error: updateBookError } = await supabase
      .from('Books')
      .update({ status: 'tersedia' })
      .eq('id', bookId);
    
    if (updateBookError) throw updateBookError;

    // 2. Update transaksi yang aktif, catat tanggal pengembalian
    const { data: updatedTransaction, error: updateTransactionError } = await supabase
      .from('Transactions')
      .update({ return_date: new Date().toISOString() })
      .eq('book_id', bookId)
      .is('return_date', null) // Hanya update yg belum dikembalikan
      .select()
      .single();

    if (updateTransactionError) throw updateTransactionError;

    return NextResponse.json(updatedTransaction);

  } catch (error: any) {
    console.error("Return Error:", error);
    return NextResponse.json({ message: error.message || 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}