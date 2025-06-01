
'use client'

import React from 'react';
import { Edit3, BookOpen, Lock } from 'lucide-react';
import Link from 'next/link';
function Navigation() {
  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem'
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#111827'
          }}>
            Personal Journal
          </div>
          <Link href="/login">
          <button style={{
            backgroundColor: '#374151',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={e => (e.target as HTMLButtonElement).style.backgroundColor = '#1f2937'}
          onMouseOut={e => (e.target as HTMLButtonElement).style.backgroundColor = '#374151'}>
            Sign In
          </button>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <Navigation />
      
      <section style={{
        padding: '4rem 1rem'
      }}>
        <div style={{
          maxWidth: '56rem',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            About Personal Journal
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            marginBottom: '4rem'
          }}>
            A private space for your thoughts, memories, and reflections.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                margin: '0 auto 1.5rem auto',
                backgroundColor: '#f3f4f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Edit3 style={{ width: '2rem', height: '2rem', color: '#6b7280' }} />
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>Write</h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Capture your thoughts, ideas, and memories in a clean interface
              </p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                margin: '0 auto 1.5rem auto',
                backgroundColor: '#f3f4f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen style={{ width: '2rem', height: '2rem', color: '#6b7280' }} />
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>Reflect</h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Review past entries to see how you&apos;ve grown and changed over time
              </p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                margin: '0 auto 1.5rem auto',
                backgroundColor: '#f3f4f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Lock style={{ width: '2rem', height: '2rem', color: '#6b7280' }} />
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>Private</h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Your entries are private and secure, accessible only to you
              </p>
            </div>
          </div>
          
          <button style={{
            backgroundColor: '#374151',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '0.375rem',
            fontSize: '1.125rem',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={e => (e.target as HTMLButtonElement).style.backgroundColor = '#1f2937'}
          onMouseOut={e => (e.target as HTMLButtonElement).style.backgroundColor = '#374151'}>
             <Link
      href="/login"
      style={{
        display: 'inline-block',
        padding: '0.5rem 1.5rem',
        
        color: '#ffffff',
        fontWeight: 600,
        textDecoration: 'none',
        borderRadius: '6px',
        transition: 'background-color 0.3s ease'
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.backgroundColor = '#374151'; 
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.backgroundColor = '#1f2937'; 
      }}
    >
      Start Journaling
    </Link>
          </button>
        </div>
      </section>
    </div>
  );
}