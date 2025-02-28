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
      <div className='app-container flex flex-col'>
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
            <button onClick={openOverlay} className='rounded-2xl bg-blue-400 shadow-md border border-slate-500'>Open Yomitomo

            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default Popup
