import { useState } from 'react'
import GemRadar from './GemRadar.jsx'
import GoesScanner from './GoesScanner.jsx'

const NAV_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #020408; }

  .nav {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
    background: #060c14;
    border-top: 1px solid #0f1f33;
    display: flex;
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
  .nav-btn {
    flex: 1; padding: 12px 8px 10px;
    background: none; border: none; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    color: #3a5570; transition: color .15s;
    font-family: 'Rajdhani', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
  }
  .nav-btn.active { color: #00f5ff; }
  .nav-btn .icon { font-size: 20px; line-height: 1; }
  .nav-divider { width: 1px; background: #0f1f33; margin: 8px 0; }
`

export default function App() {
  const [tab, setTab] = useState('gems')

  return (
    <>
      <style>{NAV_STYLE}</style>

      {tab === 'gems'  && <GemRadar />}
      {tab === 'goes'  && <GoesScanner />}

      <nav className="nav">
        <button className={`nav-btn ${tab==='gems'?'active':''}`} onClick={()=>setTab('gems')}>
          <span className="icon">💎</span>
          GemRadar
        </button>
        <div className="nav-divider"/>
        <button className={`nav-btn ${tab==='goes'?'active':''}`} onClick={()=>setTab('goes')}>
          <span className="icon">📊</span>
          Scanner Góes
        </button>
      </nav>
    </>
  )
}
