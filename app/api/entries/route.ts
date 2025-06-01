import { NextRequest, NextResponse } from 'next/server';

// Mock API routes - replace with real database later
export async function GET() {
  try {
    // Retrieve entries from localStorage (NOTE: localStorage won't work in Next.js API routes)
    const savedEntries = localStorage.getItem('entries');
    const entries = savedEntries ? JSON.parse(savedEntries) : [];

    // In real app, verify authentication and get user's entries from database
    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Failed to retrieve entry:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve entries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the body
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Create new entry
    const newEntry = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

   
    const savedEntries = localStorage.getItem('entries');
    const entries = savedEntries ? JSON.parse(savedEntries) : [];

    
    const updatedEntries = [newEntry, ...entries];
    localStorage.setItem('entries', JSON.stringify(updatedEntries));

    
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error('Failed to create entry:', error);
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    );
  }
}
