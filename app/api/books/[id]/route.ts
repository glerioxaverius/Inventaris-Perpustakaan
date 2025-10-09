import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { data: book, error } = await supabase
    .from('Books')
    .select('*')
    .eq('id', id)
    .single(); 

  if (error || !book) {
    return NextResponse.json({ message: 'Buku tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function PUT(
  request: Request,
  { params }: { params: { id:string } }
) {
  const { id } = params;
  const updatedData = await request.json();

  const { data: updatedBook, error } = await supabase
    .from('Books')
    .update(updatedData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(updatedBook);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { error } = await supabase
    .from('Books')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Buku berhasil dihapus' }, { status: 200 });
}