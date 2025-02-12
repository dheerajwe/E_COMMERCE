import React,{useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from "./Title"
import ProductItem from './ProductItem';
const RelatedProducts = ({category,subcategory}) => {
    const[related,setrelated]=useState([]);
    const {products}=useContext(ShopContext);
    
useEffect(()=>{
    if(products.length>0){
        let copy=products.slice();
        copy=copy.filter((item)=>(item.category == category));
        copy=copy.filter((item)=>(item.subCategory == subcategory));
        setrelated(copy.slice(0,5))

    }
},[products])
  return (
    <div className='my-24'>
        <div className='text-3xl text-center py-2'>

        <Title text1={"Related"} text2={"Products"}></Title>

        </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
       
        {related.map((item,index)=>(
            <ProductItem name={item.name} price={item.price} id={item._id} image={item.image} key={index}/>
        ))}

      </div>
    </div>
  )
}

export default RelatedProducts;
