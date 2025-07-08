import React from 'react'
import { HeroSection } from '../components/layout'

function HomePage({ navigate }) {
  return (
    <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      <HeroSection navigate={navigate} />

      {/* Content Cards */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        {/* Card 1 */}
        <div style={{
          backgroundColor: 'var(--card)',
          color: 'var(--card-foreground)',
          padding: '2rem',
          borderRadius: 'var(--radius)',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid var(--border)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '1rem'
          }}>
            🚀 High-Speed Proxies
          </h3>
          <p style={{
            color: 'var(--muted-foreground)',
            lineHeight: '1.6'
          }}>
            Access our premium proxy servers located worldwide with guaranteed uptime and fast speeds.
          </p>
        </div>

        {/* Card 2 */}
        <div style={{
          backgroundColor: 'var(--card)',
          color: 'var(--card-foreground)',
          padding: '2rem',
          borderRadius: 'var(--radius)',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid var(--border)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '1rem'
          }}>
            🛠️ Advanced Tools
          </h3>
          <p style={{
            color: 'var(--muted-foreground)',
            lineHeight: '1.6'
          }}>
            Comprehensive toolkit for proxy testing, IP checking, and network analysis.
          </p>
        </div>

        {/* Card 3 */}
        <div style={{
          backgroundColor: 'var(--card)',
          color: 'var(--card-foreground)',
          padding: '2rem',
          borderRadius: 'var(--radius)',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid var(--border)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '1rem'
          }}>
            🔒 Secure & Anonymous
          </h3>
          <p style={{
            color: 'var(--muted-foreground)',
            lineHeight: '1.6'
          }}>
            Protect your privacy with our secure proxy connections and anonymity verification.
          </p>
        </div>
      </section>
    </main>
  )
}

export default HomePage
