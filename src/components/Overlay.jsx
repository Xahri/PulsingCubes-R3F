export function Overlay() {
  
  return (
      <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', fontFamily: 'Bebas Neue', fontSize: '1em', fontWeight: '24', opacity: '100%', letterSpacing: '0.04em' }}>
          <a href="https://github.com/Xahri" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
              Bassem Youssef —
          </a>
          <div style={{ position: 'absolute', bottom: 40, right: 90, fontSize: '13px' }}>
              19/01/2023
          </div>
          <div style={{ position: 'relative', top: 40, margin: 'auto', textAlign: 'center', fontSize: '24px' }} > Select a cube! </div>
      </div>
  )
}