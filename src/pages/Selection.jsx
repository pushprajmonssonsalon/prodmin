import React from 'react'
import { useNavigate } from 'react-router-dom'

const Selection = () => {
    const navigate = useNavigate();
    const crmToken = localStorage.getItem('crmtoken');
    const proToken = localStorage.getItem('protoken');
    const handleSelection=(value)=>{
        localStorage.setItem("isAdmin",value)
        if(crmToken) navigate('/dash-board');
        else if(proToken) navigate('/dashboard');
        else navigate('/login')
    }
  return (
    <div className='w-screen h-screen bg-selectbg bg-cover flex justify-center items-center'>
        <div className='w-1/3 flex flex-col gap-y-14'>
            <div className='w-full bg-[#ef233c] text-center px-5 py-5 text-[#e5e5e5] font-serif font-semibold text-3xl cursor-pointer hover:scale-x-110 hover:text-white transition-all duration-300 ease-in-out rounded-lg shadow-xl' onClick={() => handleSelection('website')}>PRO Salon Kart</div>
            <div className='w-full bg-[#ef233c] text-center px-5 py-5 text-[#e5e5e5] font-serif font-semibold text-3xl cursor-pointer hover:scale-x-110 hover:text-white transition-all duration-300 ease-in-out rounded-lg shadow-xl' onClick={() => handleSelection('crm')}>CRM</div>
        </div>
    </div>
  )
}

export default Selection