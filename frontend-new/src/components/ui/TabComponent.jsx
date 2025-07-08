import { useState } from 'react'

export function Tabs({ defaultValue, className, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  
  return (
    <div className={className} data-active-tab={activeTab}>
      {children({ activeTab, setActiveTab })}
    </div>
  )
}

export function TabsList({ children, activeTab, setActiveTab }) {
  return (
    <div style={{
      display: 'flex',
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)',
      padding: '4px',
      marginBottom: '1rem'
    }}>
      {children.map(child => 
        child.type === TabsTrigger 
          ? { ...child, props: { ...child.props, activeTab, setActiveTab } }
          : child
      )}
    </div>
  )
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value
  
  return (
    <button
      onClick={() => setActiveTab(value)}
      style={{
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: 'calc(var(--radius) - 2px)',
        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
        color: isActive ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        outline: 'none'
      }}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, activeTab }) {
  if (activeTab !== value) return null
  
  return (
    <div style={{
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)'
    }}>
      {children}
    </div>
  )
}

// Simple tabs component for easy use
export default function TabComponent({ tabs, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{
        display: 'flex',
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: '4px',
        marginBottom: '1rem',
        gap: '2px'
      }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: 'calc(var(--radius) - 2px)',
              backgroundColor: activeTab === index ? 'var(--primary)' : 'transparent',
              color: activeTab === index ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div style={{
        padding: '1rem',
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)'
      }}>
        {tabs[activeTab]?.content}
      </div>
    </div>
  )
}