export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Handyman Service Booking</h1>
      <p>Welcome to your handyman service booking application!</p>
      <div style={{ marginTop: '20px' }}>
        <button style={{ 
          padding: '10px 20px', 
          background: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Book a Service
        </button>
      </div>
    </div>
  )
}
