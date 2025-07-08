import React from 'react'
import { FlipWords } from '../ui'

const HeroSection = ({ navigate }) => {
  const words = ["NextProbe", "Proxy Testing", "Secure Browsing", "Fast Analysis", "Smart Tools"]
  
  return (
    <section style={{
      textAlign: 'center',
      padding: '3rem 0'
    }}>
      <h2 style={{
        fontSize: '3rem',
        fontWeight: '700',
        color: 'var(--foreground)',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        Welcome to{' '}
        <FlipWords 
          words={words}
          duration={3000}
          className="text-blue-500 dark:text-blue-400"
        />
      </h2>
      <p style={{
        fontSize: '1.25rem',
        color: 'var(--muted-foreground)',
        marginBottom: '2rem',
        maxWidth: '600px',
        margin: '0 auto 2rem auto'
      }}>
        High-speed proxy servers and advanced tools for secure internet browsing and data access.
      </p>
      <button 
        onClick={() => navigate('proxy-list')}
        style={{
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-hover)'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary)'}
      >
        View Proxy List
      </button>
    </section>
  )
}

export default HeroSection
