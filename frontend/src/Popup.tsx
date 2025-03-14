import logo from './assets/Yomitomo.png'
import './Popup.css'
import { useState } from 'react';

function Popup() {

  const [language, setLanguage] = useState<String>("EN");

  const openOverlay = () => {
    // Send a message to the active tab to trigger the overlay injection
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id !== undefined) {
        chrome.runtime.sendMessage({ action: "toggleOverlay" });
      }
    });
  };
  
  const toggleLanguage = () => {
    // toggle display language of the popup... (currently only english and japanese)
    if (language === "EN") setLanguage("JP");
    else setLanguage("EN");
  };

  return (
    <>
      
      <div className='app-container flex flex-col bg-white'>
        <div className='header grid grid-cols-12 my-2 gap-2'>
          <a href="https://github.com/RoninSR7/Yomitomo" target="_blank" className="col-span-3">
            <img 
              src={logo}
              className=""
              alt="Yomitomo logo"
              width={150} 
              height={150} />
          </a>

          <h1 className='col-span-9 text-3xl font-bold text-slate-500 flex items-center justify-center logo-title'>
            Yomitomo
          </h1>
        </div>

        <div className='content flex flex-col justify-center items-center'>
          <div className='flex flex-row justify-center items-center'>
          <h2>Yomitomo is a GPT-integrated language translation/chat app.</h2>
          </div>
        </div>
        
        <div className='flex flex-col justify-center items-center'>
          
          <button
            onClick={openOverlay} 
            // className='rounded-2xl bg-gradient-to-r from-blue-300 to-green-700 shadow-md border border-slate-500 my-5 hover:scale-105 duration-300 px-8 py-2 w-48'>
            className="rounded-2xl bg-gradient-to-r from-[#7068f0]  to-[#03b1d5] shadow-md border border-slate-500 my-5 hover:scale-105 transition-transform duration-300 px-8 py-2 w-48">
            Open Yomitomo
          </button>

          <button
          onClick = {toggleLanguage}

          className = "rounded-2xl bg-gradient-to-r from-[#7068f0]  to-[#03b1d5] shadow-md border border-slate-500 my-5 hover:scale-105 transition-transform duration-300 px-8 py-2 w-48">
          Go Monolingual... (日本語)

          </button>
        </div>

      

      </div>
    </>
  )
}

export default Popup
