function AboutPage() {
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
        About NextProbe
      </h1>
      
      <div style={{
        display: 'grid',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
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
            What is NextProbe?
          </h2>
          <p style={{
            color: 'var(--muted-foreground)',
            lineHeight: '1.6',
            marginBottom: '1rem'
          }}>
            NextProbe is a comprehensive proxy management platform that provides access to a wide range of proxy servers worldwide. 
            Our platform offers high-speed, secure, and reliable proxy connections for various use cases including web scraping, 
            privacy protection, and geo-restriction bypass.
          </p>
          <p style={{
            color: 'var(--muted-foreground)',
            lineHeight: '1.6'
          }}>
            With our advanced tools and real-time monitoring, you can ensure optimal performance and security for all your proxy needs.
          </p>
        </div>

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
            Key Features
          </h2>
          <ul style={{
            color: 'var(--muted-foreground)',
            lineHeight: '1.6',
            paddingLeft: '1.5rem'
          }}>
            <li>High-speed proxy servers in multiple locations</li>
            <li>Real-time proxy health monitoring</li>
            <li>Multiple proxy protocols (HTTP, HTTPS, SOCKS5)</li>
            <li>Advanced proxy testing tools</li>
            <li>IP location and anonymity checking</li>
            <li>Automated proxy rotation</li>
            <li>24/7 customer support</li>
            <li>API access for developers</li>
          </ul>
        </div>

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
            Statistics
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: 'var(--secondary)',
              borderRadius: 'var(--radius)'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--primary)',
                margin: 0
              }}>
                500+
              </h3>
              <p style={{
                color: 'var(--muted-foreground)',
                margin: '0.5rem 0 0 0'
              }}>
                Active Proxies
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: 'var(--secondary)',
              borderRadius: 'var(--radius)'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--primary)',
                margin: 0
              }}>
                50+
              </h3>
              <p style={{
                color: 'var(--muted-foreground)',
                margin: '0.5rem 0 0 0'
              }}>
                Countries
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: 'var(--secondary)',
              borderRadius: 'var(--radius)'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--primary)',
                margin: 0
              }}>
                99.9%
              </h3>
              <p style={{
                color: 'var(--muted-foreground)',
                margin: '0.5rem 0 0 0'
              }}>
                Uptime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
