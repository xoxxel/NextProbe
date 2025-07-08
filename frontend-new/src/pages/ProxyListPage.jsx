function ProxyListPage() {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--foreground)',
        marginBottom: '2rem'
      }}>
        Proxy List
      </h1>
      
      <div style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--foreground)',
          marginBottom: '1rem'
        }}>
          Available Proxies
        </h2>
        
        <div style={{
          display: 'grid',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Proxy List Items */}
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--secondary)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--foreground)' }}>
                  192.168.1.100:8080
                </h3>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--muted-foreground)' }}>
                  HTTP • USA • Active
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  Test
                </button>
                <button style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--secondary)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--foreground)' }}>
                  10.0.0.1:3128
                </h3>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--muted-foreground)' }}>
                  HTTPS • Germany • Active
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  Test
                </button>
                <button style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--secondary)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--foreground)' }}>
                  172.16.0.1:9090
                </h3>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--muted-foreground)' }}>
                  SOCKS5 • Japan • Active
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  Test
                </button>
                <button style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem'
        }}>
          <button style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Refresh List
          </button>
          <p style={{ color: 'var(--muted-foreground)', margin: 0 }}>
            Last updated: 2 minutes ago
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProxyListPage
