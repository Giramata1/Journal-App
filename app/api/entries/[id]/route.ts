'use client'

import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  _request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
   
    const savedEntries = localStorage.getItem('entries');
    if (!savedEntries) {
      return NextResponse.json({ success: false, error: 'No entries found' }, { status: 404 });
    }

    
    const entries = JSON.parse(savedEntries);
    const updatedEntries = entries.filter((entry: { id: string }) => entry.id !== params.id);

   
    if (entries.length === updatedEntries.length) {
      return NextResponse.json({ success: false, error: 'Entry not found' }, { status: 404 });
    }

    
    localStorage.setItem('entries', JSON.stringify(updatedEntries));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete entry:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete entry' }, { status: 500 });
  }
}