
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Home from './components/Home'
import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import Orders from './components/Orders'
import AdminDashboard from './components/AdminDashboard'
import Profile from './components/Profile'
import SearchResults from './components/SearchResults'
import ProductDetails from './components/ProductDetails'
import Wishlist from './components/Wishlist'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
