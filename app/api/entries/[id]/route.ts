
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 

  try {
    const entryRef = (await import('@/lib/firebase-admin')).db.collection('entries').doc(id);
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