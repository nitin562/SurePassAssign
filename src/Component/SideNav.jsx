import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SideNav({ show,setshow }) {
    const nav=useNavigate()
    const clickOnItem=(path,num)=>{
        setshow(false)
        setselected(num)
        nav(path)
    }
    const [selected, setselected] = useState(0)
    const path=useLocation()
    useEffect(()=>{
        if(path.pathname.includes("gen")){
            setselected(2)
        }
        else{
            setselected(1)
        }
    },[selected])
    return (
        <div className=' transition-all py-4 duration-300 w-[80%] md:w-[20rem] absolute top-0 z-30 bg-white md:static h-full overflow-hidden' style={{ left: !show ? "-300%" : "0" }}>
            <ul className='flex flex-col gap-5 *:cursor-pointer '>
                <li className='flex gap-3 px-5 py-3 text-md items-center text-gray-600 font-Philosopher text-lg border-r-[2px] border-white hover:border-r-[2px] border-r-lightBg hover:bg-lightBg/20 hover:text-mainBg transition-all duration-300' style={{ backgroundColor: selected == 1 ? "rgb(59 46 97 / 0.2)" : "", borderColor: selected == 1 ? "#3b2e61" : "#fff", color: selected == 1 ? "#322654" : "" }} onClick={()=>clickOnItem("/bill",1)}><i className="fa-solid fa-house bg-gray-200 p-2 transition-all duration-300" ></i> Home</li>

                <li className='flex gap-3 px-5 py-3 text-md items-center text-gray-600 font-Philosopher text-lg border-r-[2px] border-white hover:border-r-[2px] border-r-lightBg hover:bg-lightBg/20 hover:text-mainBg transition-all duration-300' style={{ backgroundColor: selected == 2 ? "rgb(59 46 97 / 0.2)" : "", borderColor: selected == 2 ? "#3b2e61" : "#fff", color: selected == 2 ? "#322654" : "" }} onClick={()=>clickOnItem("./gen",2)}><i className="fa-solid fa-cash-register bg-gray-200 p-2 transition-all duration-300" ></i> Generate Bill</li>



            </ul>
        </div>
    )
}
