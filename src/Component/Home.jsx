import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Sign from './Sign'
import Bill from './Bill'

export default function Home() {
  return (
    <div className='w-screen h-screen'>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/sign" element={<Sign/>}/>
            <Route path="/bill/*" element={<Bill/>}/>


        </Routes>
    </div>
  )
}
