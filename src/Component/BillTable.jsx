import React, { useState } from 'react'
// import "/common.css?url"
import { useSelector } from 'react-redux'
import { Popover, Tooltip } from 'antd'
import ModalUtil from '../utils/ModalUtil'

export default function BillTable() {
    const bills = useSelector(state => state.Bill.bill)
    console.log(bills)
    const [modal, setmodal] = useState(false)
  
    const PopoverContent = (data) => {
        return <div className='cursor-pointer hover:text-green-500' onClick={() => showModal(data)}>
            <i className="fa-solid fa-circle-info"></i>
        </div>
    }
    const showModal = (data) => {
        setmodal({ show: true, data })
    }
    const modalContent = (data) => {

        return <div className='flex flex-col gap-3 overflow-y-auto h-[50vh] scrollbar px-2'>
            <div className='flex text-lg md:text-xl font-Jost items-center gap-4'>Client Info <div className='flex-1 h-[1px] bg-mainBg'></div></div>
            <p className='text-md md:text-lg font-Quicksand'>Client Name - <span className='font-semibold'>{data.client}</span></p>
            <p className='text-md md:text-lg font-Quicksand'>Contact No. - <span className='font-semibold'>{data.contact}</span></p>
            <p className='text-md md:text-lg font-Quicksand'>Address - <span className='font-semibold'>{data.address}</span></p>
            <p className='text-md md:text-lg font-Quicksand'>Billing Date - <span className='font-semibold'>{data.date}</span></p>
            <div className='font-Jost flex items-center text-lg md:text-xl gap-4'>Products <div className='flex-1 h-[1px] bg-mainBg'></div></div>
            <div className='border-[1px] border-mainBg p-2'>
                {data.items.map((item, i) => {
                    return <p className='text-md md:text-lg font-Quicksand font-semibold' key={i}>{item.name} - {item.quantity} x {item.price} = ${item.total}</p>
                })}
            </div>
            <div className='font-Jost flex items-center text-lg md:text-xl gap-4'>Price Tally<div className='flex-1 h-[1px] bg-mainBg'></div></div>
            <p className='text-md md:text-lg font-Quicksand'>Sub Total - <span className='font-semibold'>${data.subTotal}</span></p>
            <p className='text-md md:text-lg font-Quicksand'>Tax Included - <span className='font-semibold'>${data.taxed}</span></p>
            <p className='text-md md:text-lg font-Quicksand'>Net Bill - <span className='font-semibold'>${data.final}</span></p>
        </div>
    }
    return (
        <div className='flex-1 flex flex-col beforeTemplate w-full md:w-[calc(100%-20rem)] bg-[#f9f7f7c8] p-3 '>
            {modal?.show && <ModalUtil title="View Information" content={modalContent(modal?.data)} show={modal?.show} setshow={setmodal} />}
            <div className='flex items-center gap-4 w-full text-mainBg font-bold font-Quicksand text-xl md:text-3xl mb-4'>Invoice Overview <div className='flex-1 h-1 bg-[#6701ff]'></div></div>
            {bills.length != 0 && <div className='overflow-x-auto border border-gray-300 rounded'>
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className=' *:font-Jost *:bg-[#fff5f5]'>
                            <th className="sticky left-0 !bg-gray-100 z-10 border border-gray-300 p-2">
                                Client
                            </th>
                            <th className="border border-gray-300 p-2">Billing Date</th>
                            <th className="border border-gray-300 p-2">Contact</th>
                            <th className="border border-gray-300 p-2">Address</th>
                            <th className="border border-gray-300 p-2">Billing Price</th>


                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((e, i) => (
                            
                                <tr key={i} className='*:min-w-[10rem] *:font-Arsenal cursor-pointer  *:bg-[#f7fafc] group hover:drop-shadow-[0_0_0.1rem_#000] '>
                                    <td className="sticky left-0 flex justify-between gap-4 items-center !bg-white z-10 border border-gray-300 group-hover:border-mainBg p-2">
                                    {e.client.slice(0,15)+(e.client.length>15?"...":"")} {PopoverContent(e)} 
                                    </td>
                                    <td className="border border-gray-300 p-2">{e.date}</td>
                                    <td className="border border-gray-300 p-2">{e.contact}</td>
                                    <td className="border border-gray-300 p-2">{e.address.slice(0,15)+(e.address.length>15?"...":"")}</td>
                                    <td className="border-[2px] border-gray-300 group-hover:border-r-mainBg p-2">{e.final}</td>


                                </tr>
                           
                        ))}
                    </tbody>
                </table>

            </div>}
            {bills.length == 0 && <div className='m-auto flex items-center justify-center'>
                <p className='text-4xl font-Anton text-gray-500 '>No Records</p>
            </div>}
        </div>
    )
}
