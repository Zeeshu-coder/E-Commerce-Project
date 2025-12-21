import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
        const [fullname,setFullname]= useState("");
        const [email,setEmail]= useState("");
        const [psw,setPsw]= useState("");
        const [phno,setPhno]= useState("");
        // const [accountType,setAccountType]=useState("")

        const handleSubmit=async(e)=>{
          e.preventDefault();
          console.log(fullname);
          console.log(email);
          console.log(psw);
          console.log(phno);
        //   console.log(accountType)
        }

  return (
    <div>
              
       <section className='section w-full md:w-full h-full flex flex-col md:flex-row md:justify-center md:items-center'>
               <img src="./login-image.jpg" alt="" className='img h-70 m-auto md:w-[50%] md:h-140 md:mt-10 md:ml-0 md:mr-5'/>
               <div className='div md:w-full'>
                 <div className="new md:w-[60%] w-full flex flex-col justify-center">
                   <h1 className='h1 text-center font-medium text-xl mb-5'>Signup with email</h1>
                   <form onSubmit={handleSubmit} className='form flex flex-col items-center'>
                         <input type="text" placeholder='Full name'
                          onChange={(e)=>{setFullname(e.target.value)}} 
                          className='name w-[70%] md:w-full border-2 p-3 mb-5 rounded-sm' />
                        <input type="email" placeholder='Email' 
                          onChange={(e)=>{setEmail(e.target.value)}} 
                          className='mail w-[70%] md:w-full border-2 p-3 mb-5 rounded-sm' />
                        <input type="password" placeholder='password' 
                          onChange={(e)=>{setPsw(e.target.value)}}  
                          className='pass w-[70%] md:w-full border-2 p-3 mb-5 rounded-sm' />
                        <input type="phone" placeholder='Phone number' 
                          onChange={(e)=>{setPhno(e.target.value)}} maxLength={10}  
                          className='phone w-[70%] md:w-full border-2 p-3 mb-5 rounded-sm' />
                        {/* <select  onChange={(e) => setAccountType(e.target.value)}
                           className="w-[70%] md:w-full border-2 p-3 mb-5 rounded-sm">
                          <option value="" disabled selected>Select Role</option>
                          <option value="student">Student</option>
                          <option value="mentor">Mentor</option>
                        </select> */}
                        <input type="submit" value="Continue" className='btn w-[70%] md:w-full h-10 bg-blue-500 rounded-xs text-white text-xl' />
                  </form>
                  <h2 className='h2 text-center mt-5 md:text-xl'>Already have an account?
                    {/* <span className='span underline ml-1 text-blue-500'><Link to='/login'>Login</Link></span> */}
                  </h2>
                </div>
              </div>
            </section>
    </div>
  )
}

export default Register
