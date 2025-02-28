import logo from './assets/Yomitomo.png'
import './Popup.css'

function Popup() {

  const openOverlay = () => {
    // Send a message to the active tab to trigger the overlay injection
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id !== undefined) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleOverlay" });
      }
    });
  };
  

  return (
    <>
      <div className='app-container'>
        <div className='header flex flex-row justify-between items-center mx-16'>
          <a href="https://github.com/RoninSR7/Yomitomo" target="_blank">
            <img 
              src={logo}
              className="absolute top-0 left-0 m-2"
              alt="Yomitomo logo"
              width={100} 
              height={100} />
          </a>

          <div className='flex flex-row justify-between items-center '>
            <h1>Yomitomo</h1>
          </div>
        </div>

        <div className='content'>
          <div className='flex flex-row justify-center items-center'>
            <h2>Yomitomo is a GPT-integrated language translation/chat app.</h2>
            <button onClick={openOverlay} className='rounded-2xl bg-blue-400 shadow-md border border-slate-500'>Open Yomitomo

            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default Popup
