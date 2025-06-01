import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const entryRef = db.collection('entries').doc(id);
    const docSnapshot = await entryRef.get();

    if (!docSnapshot.exists) {
      return NextResponse.json({ success: false, error: 'Entry not found' }, { status: 404 });
    }

    await entryRef.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete entry:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete entry' }, { status: 500 });
  }
}
