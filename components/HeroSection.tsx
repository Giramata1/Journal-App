'use client'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="hero"
      style={{
        textAlign: 'center',
        padding: '0', 
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
      }}
    >
      <div className="container">
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 500,
            color: '#111827',
            marginBottom: '1rem',
          }}
        >
          Your Personal Journal
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          A simple space to capture your thoughts, memories, and reflections.
        </p>
        <div
          className="hero-buttons"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
            href="/login"
            className="btn btn-primary"
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s',
              background: '#374151',
              color: 'white',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#1f2937')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#374151')}
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="btn btn-secondary"
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s',
              background: 'transparent',
              color: '#6b7280',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#f9fafb')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Learn More
          </Link>
        </div>
      </div>
      <footer
        style={{
          position: 'absolute', 
          bottom: '0',
          width: '100%',
          textAlign: 'center',
          padding: '1rem 0',
          color: '#9ca3af',
          fontSize: '0.75rem',
        }}
      >
        <p>© 2025 Personal Journal App</p>
      </footer>
    </section>
  )
}