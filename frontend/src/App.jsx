
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Home from './components/Home';

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
