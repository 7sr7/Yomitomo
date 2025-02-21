import logo from './assets/Yomitomo.png'
import './App.css'

function App() {

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
      </div>
    </>
  )
}

export default App
