function HeaderSection({ title, description }) {
  return (
    <div style={{
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)',
      padding: '2rem',
      marginBottom: '1.5rem'
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '700',
        color: 'var(--foreground)',
        marginBottom: '0.5rem'
      }}>
        {title}
      </h1>
      
      <p style={{
        color: 'var(--muted-foreground)',
        fontSize: '1rem',
        lineHeight: '1.5',
        margin: '0'
      }}>
        {description}
      </p>
    </div>
  )
}

export default HeaderSection
