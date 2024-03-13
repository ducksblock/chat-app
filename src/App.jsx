import './App.css'
import TextInput from './components/TextInput'
import Chat from './components/Chat'

function App() {
  return (
    <>
      <div className='bg-black h-[100vh]'>
        <Chat />
        <TextInput />
      </div>
    </>
  )
}

export default App
