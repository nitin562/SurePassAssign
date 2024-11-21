import React, { useState } from 'react'
import Nav from './Nav'
// import "/common.css?url"
import SideNav from './SideNav'
import { Route, Routes } from 'react-router-dom'
import BillTable from './BillTable'
import BillGenerate from './BillGenerate'
export default function Bill() {
  const [toggle, settoggle] = useState(true)
  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden before:opacity-80 bg-white '>
      <Nav changeToogle={settoggle}/>
      <div className='h-[calc(100%-4rem)] scrollbar flex'>
        <SideNav show={toggle} setshow={settoggle}/>
        <Routes>
          <Route path="/" element={<BillTable/>}/>
          <Route path="/gen" element={<BillGenerate/>}/>

        </Routes>
      </div>
    </div>
  )
}
