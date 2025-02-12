import React from 'react'
import Title from "../components/Title"
import NewsLetter from "../components/NewsLetter"
import {assets} from "../assets/assets"

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"}/>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>At our Website, we believe shopping should be more than just a transaction—it should be an experience. As a trusted destination for, we are committed to bringing you the best in style, convenience, and value. Our journey began with a passion!</p>
        <p> your one-stop shop for We are dedicated to providing a seamless shopping experience with top-notch products, great prices, and exceptional customer service. At  your satisfaction is our priority—shop with confidence today!</p>
        <b className='text-gray-800'>Our Mission</b>
        <p> your one-stop shop for We are dedicated to providing a seamless shopping experience with top-notch products, great prices, and exceptional customer service. At  your satisfaction is our priority—shop with confidence today!</p>
        </div>

      </div>
      <div className='text-xl py-4'>
           <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:px-20 flex flex-col gap-5'>
          <b>Quality Assurance :</b>
          <p className='text-gray-600'> your one-stop shop for We are dedicated to providing a seamless shopping experience with top-notch products, great prices, and exceptional customer service. </p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:px-20 flex flex-col gap-5'>
          <b>Convenience :</b>
          <p className='text-gray-600'> your one-stop shop for We are dedicated to providing a seamless shopping experience with top-notch products, great prices, and exceptional customer service. </p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:px-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service :</b>
          <p className='text-gray-600'> your one-stop shop for We are dedicated to providing a seamless shopping experience with top-notch products, great prices, and exceptional customer service. </p>

        </div>

      </div>
      <NewsLetter/>
    </div>
  )
}

export default About
