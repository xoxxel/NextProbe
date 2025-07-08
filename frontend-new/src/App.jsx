import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const appStyle = {
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    minHeight: '50vh',
    textAlign: 'center',
    margin: '20px',
    border: '5px solid lime',
    borderRadius: '10px'
  }

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '18px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }

  return (
    <div style={appStyle}>
      <h1 style={{ color: '#00ff00', fontSize: '36px' }}>
        🚀 React کار می‌کند! 🚀
      </h1>
      
      <p style={{ fontSize: '20px', color: '#ffff00' }}>
        شمارنده: {count}
      </p>
      
      <button style={buttonStyle} onClick={() => setCount(count + 1)}>
        افزایش +
      </button>
      
      <button style={buttonStyle} onClick={() => setCount(0)}>
        صفر
      </button>
      
      <div style={{ 
        backgroundColor: '#222', 
        padding: '20px', 
        marginTop: '20px',
        borderRadius: '5px'
      }}>
        <p>✅ React State کار می‌کند</p>
        <p>✅ onClick کار می‌کند</p>
        <p>✅ Re-render کار می‌کند</p>
      </div>
    </div>
  )
}

export default App
