import { useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'
import siteLogo from './assets/site-icon.svg'
import ProxyListPage from './ProxyListPage.jsx'
import ToolsPage from './ToolsPage.jsx'
import AboutPage from './AboutPage.jsx'
import ContactPage from './ContactPage.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigate = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'proxy-list':
        return <ProxyListPage />
      case 'tools':
        return <ToolsPage />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      default:
        return (
          <main style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1rem'
          }}>
            {/* Hero Section */}
            <section style={{
              textAlign: 'center',
              padding: '3rem 0'
            }}>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                Welcome to NextProbe
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
                  color: 'var(--primary-foreground)',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                View Proxy List
              </button>
            </section>

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
  }
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'var(--card)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        padding: '0.75rem 0',
        borderBottom: '1px solid var(--border)',
        height: '64px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <img 
              src={siteLogo} 
              alt="Site Logo" 
              style={{
                width: '32px',
                height: '32px'
              }}
            />
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--foreground)',
              margin: 0
            }}>
              NextProbe
            </h1>
          </div>
          <nav style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigate('home') }}
              style={{
                color: currentPage === 'home' ? 'var(--primary)' : 'var(--muted-foreground)',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem'
              }}
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigate('proxy-list') }}
              style={{
                color: currentPage === 'proxy-list' ? 'var(--primary)' : 'var(--muted-foreground)',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem'
              }}
            >
              Proxy List
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigate('tools') }}
              style={{
                color: currentPage === 'tools' ? 'var(--primary)' : 'var(--muted-foreground)',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem'
              }}
            >
              Tools
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Dynamic Page Content */}
      <div style={{ flex: 1 }}>
        {renderPage()}
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.4rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          minHeight: '28px',
          height: '36px'
        }}>
          {/* Left side - Brand & Copyright */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <img 
                src={siteLogo} 
                alt="NextProbe" 
                style={{
                  width: '14px',
                  height: '14px',
                  opacity: 0.8
                }}
              />
              <span style={{
                fontSize: '0.7rem',
                fontWeight: '500',
                color: 'var(--muted-foreground)'
              }}>
                NextProbe
              </span>
            </div>
            <span style={{
              color: 'var(--muted-foreground)',
              fontSize: '0.65rem',
              opacity: 0.7
            }}>
              © 2025
            </span>
          </div>

          {/* Center - Navigation */}
          <div style={{
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'center'
          }}>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigate('about') }}
              style={{
                color: 'var(--muted-foreground)',
                textDecoration: 'none',
                fontSize: '0.7rem',
                fontWeight: '400',
                transition: 'color 0.2s',
                opacity: 0.8
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--muted-foreground)'}
            >
              About
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigate('contact') }}
              style={{
                color: 'var(--muted-foreground)',
                textDecoration: 'none',
                fontSize: '0.7rem',
                fontWeight: '400',
                transition: 'color 0.2s',
                opacity: 0.8
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--muted-foreground)'}
            >
              Contact
            </a>
            <a href="#" style={{
              color: 'var(--muted-foreground)',
              textDecoration: 'none',
              fontSize: '0.7rem',
              fontWeight: '400',
              transition: 'color 0.2s',
              opacity: 0.8
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--foreground)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--muted-foreground)'}
            >
              Privacy
            </a>
          </div>

          {/* Right side - Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.65rem',
            color: 'var(--muted-foreground)',
            opacity: 0.8
          }}>
            <span style={{
              width: '3px',
              height: '3px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'inline-block'
            }}></span>
            Online
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
