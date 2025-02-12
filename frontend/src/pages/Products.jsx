import React, { useContext, useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import ProductItem from "../components/ProductItem"
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Products = () => {
  const {productId}=useParams();
  const {products,currency,cartItems,addToCart} =useContext(ShopContext);
  const[product,setProduct]=useState(false);
  const[image,setImage]=useState(false);
  const[size,set]=useState("");

  const Display = async()=>{
    products.find((item)=>{
      if(item._id===productId){
        setProduct(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

 useEffect(()=>{
  Display();
 },[product]);


  return product ? (
   
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacithy-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
      {product.image.map((item,index)=>(
        <img src={item} key={index} onClick={()=>(setImage(item))} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'></img>
      )
      )}
           </div>
           <div className='w-full sm:w-[80%]'>
              <img src={image} className='w-full h-auto'></img>
           </div>

        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className='w-3 5'></img>
            <img src={assets.star_icon} className='w-3 5'></img>
            <img src={assets.star_icon} className='w-3 5'></img>
            <img src={assets.star_icon} className='w-3 5'></img>
            <img src={assets.star_dull_icon} className='w-3 5'></img>
            <p className='pl-2'>(100)</p>
          </div>
          <p className='tetx-3xl font-medium mt-5'>{currency}{product.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
               {
                product.sizes.map((item,index)=>(
                  <button onClick={()=>(set(item))} className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`} key={index}>{item}</button>
                ))
               }
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={()=>addToCart(product._id,size)}>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'></hr>
          <div className='mt-5 flex flex-col text-sm text-gray-500 gap-1'>
            <p>100 % Original Product</p>
            <p>Eash Cash on Delivery and Exchange Policy</p>
            <p>No Transport fees</p>

          </div>
        </div>
      </div>
     
     <div className='mt-20'>
      <div className='flex'>
        
          <b className='text-sm py-5 px-3 text-sm'>Description</b>
          <p className='text-sm py-5 px-3 text-sm'>Reviews (100)</p>
        

      </div>
      <div className='flex flex-col border gap-4 py-6 px-6 text-sm text-gray-500 '>
        <p> An E-Commerce Website u can trust and invest</p>
        <p> An E-Commerce Website u can trust and invest</p>

      </div>
       <div className='mt-5'>
       <RelatedProducts category={product.category} subcategory={product.subCategory}/>

       </div>
     </div>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Products;
