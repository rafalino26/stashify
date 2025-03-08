import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// GET all todos
export async function GET() {
  const { data, error } = await supabase.from('todos').select('*');
  
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json(data);
}

// CREATE new todo
export async function POST(request: Request) {
  const { title } = await request.json();
  
  const { data, error } = await supabase
    .from('todos')
    .insert([{ title }])
    .select();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json(data[0], { status: 201 });
}

// UPDATE todo
export async function PUT(request: Request) {
  const { id, ...updateData } = await request.json();
  
  const { data, error } = await supabase
    .from('todos')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// DELETE todo
export async function DELETE(request: Request) {
  const { id } = await request.json();
  
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}