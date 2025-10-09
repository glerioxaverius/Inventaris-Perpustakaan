import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
    const {data: books, error} = await supabase
    .from('Books')
    .select('*');

    if (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(books);
}

export async function POST(request: Request) {
  try {
    const newBookData = await request.json();

    const { data: newBook, error } = await supabase
      .from('Books')
      .insert([newBookData])
      .select()
      .single();

    if (error) {
      console.error('Error inserting book:', error);
      if (error.code === '23505') {
        return NextResponse.json({ error: 'ISBN sudah terdaftar.' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(newBook, { status: 201 });
  
  } catch (e) {
    return NextResponse.json({ error: 'Data input tidak valid.' }, { status: 400 });
  }
}