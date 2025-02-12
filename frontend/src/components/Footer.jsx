import React from 'react'
import {assets} from "../assets/assets"
const Footer = () => {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} className='w-32 mb-5'/>
        <p className='w-full text-gray-600 md:w-2/3'>Lorem ipsum is simply dummy text of the printing and typescripting industry.</p>
      </div>
      <div>
        <p className='text-xl mb-5 font-medium'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className='text-xl mb-5 font-medium'>Get In Touch</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>9849345835</li>
          <li>dheerajmande@gmail.com</li>
          
        </ul>
      </div>
    </div>
    <div>
        <hr/>
        <p className='py-5 text-center text-sm'>CopyRights @dheerajmande -All rights reserved</p>
    </div>
    </div>
   
  )
}

export default Footer
