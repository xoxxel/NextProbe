function ToolDescription({ title, icon, description, features, tips }) {
  return (
    <div style={{
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)',
      padding: '2rem',
      position: 'sticky',
      top: '2rem'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: 'var(--foreground)',
        marginBottom: '1rem'
      }}>
        {icon} {title}
      </h2>
      <p style={{
        color: 'var(--muted-foreground)',
        marginBottom: '1.5rem',
        lineHeight: '1.6'
      }}>
        {description}
      </p>
      
      {features && features.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '0.5rem'
          }}>
            Available Features:
          </h3>
          <ul style={{
            color: 'var(--muted-foreground)',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            paddingLeft: '1.5rem'
          }}>
            {features.map((feature, index) => (
              <li key={index}>
                {feature.icon} <strong>{feature.name}</strong> - {feature.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tips && tips.length > 0 && (
        <div style={{
          backgroundColor: 'var(--background)',
          padding: '1rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <h4 style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: '0.5rem'
          }}>
            💡 Tips:
          </h4>
          <ul style={{
            color: 'var(--muted-foreground)',
            fontSize: '0.85rem',
            lineHeight: '1.4',
            margin: '0',
            paddingLeft: '1.2rem'
          }}>
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ToolDescription
