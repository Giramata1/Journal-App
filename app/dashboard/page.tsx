'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import EntryList from '@/components/EntryList'
import Navigation from '@/components/Navigation'
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  deleteDoc, 
  doc,
  orderBy,
  addDoc
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Entry {
  id: string
  title: string
  content: string
  createdAt: string
  userId: string
}

interface User {
  id: string
  name: string
  email: string
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [newEntry, setNewEntry] = useState({ title: '', content: '' })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    const currentUser = JSON.parse(userData) as User
    setUser(currentUser)

    const entriesRef = collection(db, 'entries')
    const q = query(
      entriesRef, 
      where('userId', '==', currentUser.id),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedEntries: Entry[] = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        fetchedEntries.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt?.toDate().toISOString() || '',
          userId: data.userId
        })
      })
      setEntries(fetchedEntries)
    })

    return () => unsubscribe()
  }, [router])

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    try {
      await deleteDoc(doc(db, 'entries', id))
    } catch (error) {
      console.error('Failed to delete entry:', error)
      alert('Failed to delete entry. Please try again.')
    }
  }

  const handleNewEntry = () => {
    setShowForm(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newEntry.title || !newEntry.content) return

    try {
      await addDoc(collection(db, 'entries'), {
        title: newEntry.title,
        content: newEntry.content,
        userId: user.id,
        createdAt: new Date()
      })
      setNewEntry({ title: '', content: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create entry:', error)
      alert('Failed to create entry. Please try again.')
    }
  }

  const handleCancel = () => {
    setNewEntry({ title: '', content: '' })
    setShowForm(false)
  }

  if (!user) return null

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <Navigation user={user} />
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '16px',
        }}
      >
        {!showForm && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#2d3748',
              }}
            >
              My Journal
            </h1>
            <button
              onClick={handleNewEntry}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#2d3748',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
              New Entry
            </button>
          </div>
        )}

        {showForm ? (
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '32px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
            }}
          >
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '32px',
              }}
            >
              New Journal Entry
            </h1>
            
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Give your entry a title"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    backgroundColor: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLInputElement
                    target.style.borderColor = '#3b82f6'
                    target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement
                    target.style.borderColor = '#d1d5db'
                    target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Content
                </label>
                <textarea
                  placeholder="Write your thoughts here..."
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  rows={12}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    backgroundColor: '#fff',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.borderColor = '#3b82f6'
                    target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.borderColor = '#d1d5db'
                    target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  gap: '12px' 
                }}
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    color: '#374151',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.15s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.backgroundColor = '#f9fafb'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.backgroundColor = '#fff'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.15s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.backgroundColor = '#111827'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.backgroundColor = '#1f2937'
                  }}
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        ) : (
          <EntryList entries={entries} onDelete={handleDeleteEntry} />
        )}
      </section>
    </main>
  )
}