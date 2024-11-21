import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Nav({changeToogle}) {
    const onToogleClick=()=>{
        changeToogle((val)=>{
            return !val
        })
    }
    const nav=useNavigate()
    let loc=useLocation()
    useEffect(()=>{
      if(!sessionStorage.getItem("name")){
        nav("/")
      }
    },[loc])
  return (
    <div className='w-full h-[4rem]  flex items-center justify-between p-2 px-5 backdrop-blur-sm bg-mainBg'>
        <img src="/bill.png" className='h-[2rem]' />
        <button onClick={onToogleClick} className='md:hidden'><i className='fa-solid fa-bars text-black text-xl'/></button>
    </div>
  )
}