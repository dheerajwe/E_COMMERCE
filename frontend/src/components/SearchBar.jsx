import React, { useEffect ,useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch}=useContext(ShopContext);
    const[visible,setVisible]=useState(false);
   
    const location=useLocation();

    useEffect(()=>{
          if(location.pathname.includes("collection")){
            setVisible(true);
          }
          else{
            setVisible(false);
          }
    },[location])

  return showSearch && visible ? (
    <div className=' text-center'>
        <div className='inline-flex items-center justify-center border border-gray-500 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type='text' placeholder='search' className='text-sm flex-1 outline-none bg-inherit'></input>
            <img src={assets.search_icon} className='w-4'></img>
        </div>
        <img className="inline w-3 cursor-pointer" onClick={()=>setShowSearch(false)} src={assets.cross_icon}></img>
      
    </div>
  ) : null
}

export default SearchBar
