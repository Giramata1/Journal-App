
import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { Entry } from './types'

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    if (!auth.currentUser) return

    const q = query(collection(db, 'entries'), where('userId', '==', auth.currentUser.uid))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Entry[]
      setEntries(entriesData)
    })

    return () => unsubscribe()
  }, [])

  return entries
}

export async function addEntry(entry: { title: string; content: string }) {
  if (!auth.currentUser) throw new Error('Not authenticated')

  await addDoc(collection(db, 'entries'), {
    ...entry,
    userId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  })
}

export async function deleteEntry(id: string) {
  if (!auth.currentUser) throw new Error('Not authenticated')

  await deleteDoc(doc(db, 'entries', id))
}
