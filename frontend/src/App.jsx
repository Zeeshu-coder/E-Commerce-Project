
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
