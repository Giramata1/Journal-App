
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBrooOdzo2y8J9xkAm1jt_MHWT1sktrv_s",
  authDomain: "personal-journal-app-3f211.firebaseapp.com",
  projectId: "personal-journal-app-3f211",
  storageBucket: "personal-journal-app-3f211.firebasestorage.app",
  messagingSenderId: "812615535000",
  appId: "1:812615535000:web:b9b0806464aa1bbdd983ed"
};

if (!getApps().length) {
  initializeApp(firebaseConfig)
}

export const auth = getAuth()
export const db = getFirestore()
