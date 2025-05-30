import React from 'react'
import Home from "./pages/Home"
import  About from "./pages/About"
import  Cart from "./pages/Cart"
import  Collection from "./pages/Collection"
import  Contact from "./pages/Contact"
import  Login from "./pages/Login"
import  Orders from "./pages/Orders"
import  PlaceOrder from "./pages/PlaceOrder"
import  Products from "./pages/Products"
import NavBar from "./components/NavBar"
import {Routes,Route} from 'react-router-dom'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>

      <NavBar/>
      <SearchBar/>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/collection" element={<Collection/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
        <Route path="/placeorder" element={<PlaceOrder/>}></Route>
        <Route path="/product/:productId" element={<Products/>}></Route>
        <Route path="/verify" element={<Verify/>} />


      </Routes>
      <Footer/>
      
    </div> 
  )
}

export default App
