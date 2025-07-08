function ContactPage() {
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
        Contact Us
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Contact Form */}
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
            Send us a Message
          </h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--foreground)',
                fontWeight: '500'
              }}>
                Name
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  fontSize: '1rem'
                }}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--foreground)',
                fontWeight: '500'
              }}>
                Email
              </label>
              <input
                type="email"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  fontSize: '1rem'
                }}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--foreground)',
                fontWeight: '500'
              }}>
                Subject
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  fontSize: '1rem'
                }}
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--foreground)',
                fontWeight: '500'
              }}>
                Message
              </label>
              <textarea
                rows="5"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
                placeholder="Tell us how we can help you..."
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                marginTop: '1rem'
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
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
            Get in Touch
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--foreground)',
                marginBottom: '0.5rem'
              }}>
                📧 Email Support
              </h3>
              <p style={{
                color: 'var(--muted-foreground)',
                margin: 0
              }}>
                support@nextvpn.com
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--foreground)',
                marginBottom: '0.5rem'
              }}>
                💬 Live Chat
              </h3>
              <p style={{
                color: 'var(--muted-foreground)',
                margin: 0
              }}>
                Available 24/7 for immediate assistance
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--foreground)',
                marginBottom: '0.5rem'
              }}>
                📞 Phone Support
              </h3>
              <p style={{
                color: 'var(--muted-foreground)',
                margin: 0
              }}>
                +1 (555) 123-4567
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--foreground)',
                marginBottom: '0.5rem'
              }}>
                🕒 Business Hours
              </h3>
              <p style={{
                color: 'var(--muted-foreground)',
                margin: 0
              }}>
                Monday - Friday: 9:00 AM - 6:00 PM (UTC)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
