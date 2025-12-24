import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {
            const [email,setEmail]= useState("");
            const [psw,setPsw]= useState("");
            // const [accountType,setAccountType]=useState("")
    
            const handleSubmit=async(e)=>{
              e.preventDefault();
              console.log(email);
              console.log(psw);
            //   console.log(accountType)
            }



  return (
      <div>  
        <Navbar/>
       <section className='section w-full md:w-full h-full flex items-center mt-15 flex-col md:flex-row md:justify-center md:items-center'>
               <div className='border-2 w-110 h-90 flex items-center justify-center '>
                 <div className="new md:w-full w-full flex flex-col justify-center mb-4 ">
                   <h1 className='h1 text-center font-medium text-xl mb-5 mt-2 md:flex md:items-center md:justify-center'>Login</h1>
                   <form onSubmit={handleSubmit} className='form flex flex-col items-center md:w-110'>
                        <input type="email" placeholder='Email' 
                          onChange={(e)=>{setEmail(e.target.value)}} 
                          className='mail w-[60%] md:w-[70%] border-2 p-3 mb-5 rounded-sm' />
                        <input type="password" placeholder='password' 
                          onChange={(e)=>{setPsw(e.target.value)}}  
                          className='pass w-[60%] md:w-[70%] border-2 p-3 mb-5 rounded-sm' />
                        <input type="submit" value="Continue" className='btn w-[60%] md:w-[70%] h-10 bg-blue-600 rounded-xs text-white text-xl' />
                  </form>
                  <h2 className='h2 text-center mt-5 md:text-xl'>Don't have an account?
                    <span className='span underline ml-1 text-blue-500'><Link to='/register'>Register</Link></span>
                  </h2>
                </div>
              </div>
            </section>
    </div>
  )
}

export default Login
