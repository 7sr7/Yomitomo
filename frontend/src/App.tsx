import { useState } from 'react'
import logo from './assets/Yomitomo.png'
import './App.css'

function App() {

  const [color, setColor] = useState("black");

  const onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.runtime.sendMessage({ 
      type: 'CHANGE_COLOR', 
      tabId: tab.id,
      color: color
    });
  };

  return (
    <>
      <div className='app-container'>
        <div className='header flex flex-row justify-between items-center mx-16'>
          <a href="https://github.com/RoninSR7/Yomitomo" target="_blank">
            <img 
              src={logo}
              className="logo"
              alt="Yomitomo logo"
              width={100} 
              height={100} />
          </a>

          <div className='flex flex-row justify-between items-center '>
            <h1>Yomitomo</h1>
          </div>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <input type="color" onChange={e => setColor(e.currentTarget.value)}/>
          <button onClick={() => onclick()}>
            Click Me
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App
