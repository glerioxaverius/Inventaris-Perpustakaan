import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; 

export async function GET() {
  const { data: members, error } = await supabase
    .from('Members') 
    .select('*');   

  if (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(members);
}

export async function POST(request: Request) {
   try {
    const { name, unique_member_id, phone } = await request.json();

    if (!name || !unique_member_id) {
      return NextResponse.json({ error: 'Nama dan ID Anggota wajib diisi.' }, { status: 400 });
    }

    const dataToInsert = {
      name,
      unique_member_id,
      phone,
    };

    const { data: newMember, error } = await supabase
      .from('Members')
      .insert([dataToInsert])
      .select()
      .single();

    if (error) {
      console.error('Error inserting member:', error);
      if (error.code === '23505') { 
        return NextResponse.json({ error: 'ID Anggota sudah terdaftar.' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(newMember, { status: 201 });
  
  } catch (e) {
    return NextResponse.json({ error: 'Data input tidak valid.' }, { status: 400 });
  }
}