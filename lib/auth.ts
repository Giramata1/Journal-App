
import { auth } from '@/lib/firebase'
import { User as FirebaseUser, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { useState, useEffect } from 'react'

export function useCurrentUser() {
  const [user, setUser] = useState<FirebaseUser | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return unsubscribe
  }, [])

  return user
}

export function isAuthenticated() {
  return auth.currentUser !== null
}

export function signOut() {
  return firebaseSignOut(auth)
}
