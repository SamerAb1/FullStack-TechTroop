import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MoviesPage from "./movies-components/MoviesPage"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MoviesPage />
    </>
  )
}

export default App
