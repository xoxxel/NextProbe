import { useState } from 'react'

function TestComponent() {
  const [message, setMessage] = useState('سلام React!')
  const [color, setColor] = useState('#ff0000')

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
  
  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(randomColor)
  }

  return (
    <div style={{
      backgroundColor: '#444',
      padding: '20px',
      margin: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      border: '3px solid #fff'
    }}>
      <h2 style={{ color: color }}>
        🎨 {message} 🎨
      </h2>
      
      <button 
        onClick={() => setMessage('React عالی کار می‌کند!')}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        تغییر متن
      </button>
      
      <button 
        onClick={changeColor}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        تغییر رنگ
      </button>
      
      <button 
        onClick={() => setMessage('سلام React!')}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ریست
      </button>
    </div>
  )
}

export default TestComponent
