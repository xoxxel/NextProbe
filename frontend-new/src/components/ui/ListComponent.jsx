import { useState } from 'react'

function ListComponent() {
  const [items, setItems] = useState(['آیتم 1', 'آیتم 2', 'آیتم 3'])
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem])
      setNewItem('')
    }
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div style={{
      backgroundColor: '#555',
      padding: '20px',
      margin: '20px',
      borderRadius: '10px',
      border: '3px solid #ffa500'
    }}>
      <h3 style={{ color: '#ffa500', textAlign: 'center' }}>
        📝 لیست تستی React 📝
      </h3>
      
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="آیتم جدید اضافه کنید..."
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '2px solid #ffa500',
            borderRadius: '5px',
            marginRight: '10px',
            width: '200px'
          }}
        />
        <button
          onClick={addItem}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#ffa500',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          اضافه کن
        </button>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{
            backgroundColor: '#666',
            padding: '10px',
            margin: '5px 0',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: 'white' }}>{item}</span>
            <button
              onClick={() => removeItem(index)}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
      
      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#333',
        borderRadius: '5px'
      }}>
        <p>✅ React Lists کار می‌کند</p>
        <p>✅ Input Handling کار می‌کند</p>
        <p>✅ Array State کار می‌کند</p>
      </div>
    </div>
  )
}

export default ListComponent
