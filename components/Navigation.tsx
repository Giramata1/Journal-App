'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NavigationProps {
  user?: {
    name: string
    email: string
  }
}

export default function Navigation({ user }: NavigationProps) {
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('entries')
    router.push('/')
  }

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link href={user ? "/dashboard" : "/"} className="nav-logo">
            Personal Journal
          </Link>
          {user && (
            <button onClick={handleSignOut} className="btn btn-secondary">
              Sign Out
            </button>
          )}
          
        </div>
      </div>
    </nav>
  )
}