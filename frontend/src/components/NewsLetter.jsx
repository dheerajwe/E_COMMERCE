import React from 'react'

const NewsLetter = () => {
    const handleSubmit=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% offer </p>
        <p className='text-gray-400 mt-3'>Lorem ipsum is simply dummy text of the printing and typescripting industry.</p>
        <form className='border w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3' onSubmit={handleSubmit}>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder="Enter Your E-mail" required/>
            <button type="submit" className='bg-black text-white text-xs px-10 py-4' >SUBSCRIBE</button>
        
        </form>
    </div>
    
  )
}

export default NewsLetter
