function ToolsPage() {
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
        Tools
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Proxy Checker Tool */}
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '1rem'
          }}>
            🔍 Proxy Checker
          </h2>
          <p style={{
            color: 'var(--muted-foreground)',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Test proxy servers for availability, speed, and anonymity level.
          </p>
          <button style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            width: '100%'
          }}>
            Open Tool
          </button>
        </div>

        {/* IP Location Tool */}
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '1rem'
          }}>
            🌍 IP Location
          </h2>
          <p style={{
            color: 'var(--muted-foreground)',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Find geographical location and ISP information for any IP address.
          </p>
          <button style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            width: '100%'
          }}>
            Open Tool
          </button>
        </div>

        {/* Speed Test Tool */}
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '1rem'
          }}>
            ⚡ Speed Test
          </h2>
          <p style={{
            color: 'var(--muted-foreground)',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Test your internet connection speed through proxy servers.
          </p>
          <button style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            width: '100%'
          }}>
            Open Tool
          </button>
        </div>

        {/* Port Scanner Tool */}
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '1rem'
          }}>
            🔧 Port Scanner
          </h2>
          <p style={{
            color: 'var(--muted-foreground)',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Scan for open ports on target servers and proxy endpoints.
          </p>
          <button style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            width: '100%'
          }}>
            Open Tool
          </button>
        </div>

        {/* Anonymity Test Tool */}
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '1rem'
          }}>
            🛡️ Anonymity Test
          </h2>
          <p style={{
            color: 'var(--muted-foreground)',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Check the anonymity level and security of your proxy connection.
          </p>
          <button style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            width: '100%'
          }}>
            Open Tool
          </button>
        </div>

        {/* Proxy Generator Tool */}
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '1rem'
          }}>
            ⚙️ Proxy Generator
          </h2>
          <p style={{
            color: 'var(--muted-foreground)',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Generate and export proxy lists in various formats for your applications.
          </p>
          <button style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            width: '100%'
          }}>
            Open Tool
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToolsPage
