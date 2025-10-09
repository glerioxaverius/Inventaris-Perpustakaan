import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
  request: Request,
  { params: {id} }: { params: { id: string } }
) {
  const { data: member, error } = await supabase
    .from('Members')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !member) {
    return NextResponse.json({ message: 'Anggota tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json(member);
}

export async function PUT(
  request: Request,
  { params: {id} }: { params: { id:string } }
) {
    const updatedData = await request.json();
  
  const { data: updatedMember, error } = await supabase
    .from('Members')
    .update(updatedData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(updatedMember);
}

export async function DELETE(
  request: Request,
  { params: {id} }: { params: { id: string } }
) {
  const { error } = await supabase
    .from('Members')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Anggota berhasil dihapus' }, { status: 200 });
}