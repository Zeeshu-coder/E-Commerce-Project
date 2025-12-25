
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login'
import Navbar from './components/layout/Navbar'
import Register from './components/Register'
import Home from './components/Home';
import Cart from './components/Cart';
import Layout from './components/layout/Layout';

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
