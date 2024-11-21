import React, { useState } from 'react'
import "/common.css?url"
import { useSelector } from 'react-redux'
import { Popover } from 'antd'
import ModalUtil from '../utils/ModalUtil'

export default function BillTable() {
    const bills = useSelector(state => state.Bill.bill)
    console.log(bills)
    const [modal, setmodal] = useState(false)
    const PopoverContent = (data) => {
        return <div className='flex items-center gap-3 text-lg cursor-pointer hover:text-green-500' onClick={()=>showModal(data)}>
            <i className="fa-solid fa-circle-info"></i> More Info
        </div>
    }
    const showModal=(data)=>{
        setmodal({show:true,data})
    }
    const modalContent = (data) => {

        return <div className='flex flex-col gap-3 overflow-y-auto h-[50vh] scrollbar px-2'>
            <div className='flex text-xl font-Jost items-center gap-4'>Client Info <div className='flex-1 h-[1px] bg-mainBg'></div></div>
            <p className='text-lg font-Quicksand'>Client Name - <span className='font-semibold'>{data.client}</span></p>
            <p className='text-lg font-Quicksand'>Contact No. - <span className='font-semibold'>{data.contact}</span></p>
            <p className='text-lg font-Quicksand'>Address - <span className='font-semibold'>{data.address}</span></p>
            <p className='text-lg font-Quicksand'>Billing Date - <span className='font-semibold'>{data.date}</span></p>
            <div className='font-Jost flex items-center text-xl gap-4'>Products <div className='flex-1 h-[1px] bg-mainBg'></div></div>
            <div className='border-[1px] border-mainBg p-2'>
            {data.items.map((item, i) => {
                return <p className='text-lg font-Quicksand font-semibold' key={i}>{item.name} - {item.quantity} x {item.price} = ${item.total}</p>
            })}
            </div>
            <div className='font-Jost flex items-center text-xl gap-4'>Price Tally<div className='flex-1 h-[1px] bg-mainBg'></div></div>
            <p className='text-lg font-Quicksand'>Sub Total - <span className='font-semibold'>${data.subTotal}</span></p>
            <p className='text-lg font-Quicksand'>Tax Included - <span className='font-semibold'>${data.taxed}</span></p>
            <p className='text-lg font-Quicksand'>Net Bill - <span className='font-semibold'>${data.final}</span></p>
        </div>
    }
    return (
        <div className='flex-1 w-full md:w-[calc(100%-20rem)] bg-[#f9f7f7c8] p-3 '>
            {modal?.show&&<ModalUtil title="View Information" content={modalContent(modal?.data)} show={modal?.show} setshow={setmodal}/>}
            <div className='flex items-center gap-4 text-mainBg font-bold font-Quicksand text-xl md:text-3xl mb-4'>Invoice Overview <div className='flex-1 h-1 bg-[#6701ff]'></div></div>
            <div className='overflow-x-auto border border-gray-300 rounded'>
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className='*:min-w-[10rem] *:font-Jost *:bg-[#fff5f5]'>
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
                            <Popover key={i} content={()=>PopoverContent(e)} trigger={'hover'} placement='topRight'>
                                <tr key={i} className='*:font-Arsenal cursor-pointer  *:bg-[#f7fafc] group hover:drop-shadow-[0_0_0.1rem_#000]'>
                                    <td className="sticky left-0 flex gap-4 items-center !bg-white z-10 border border-gray-300 group-hover:border-mainBg p-2">
                                        {e.client}
                                    </td>
                                    <td className="border border-gray-300 p-2">{e.date}</td>
                                    <td className="border border-gray-300 p-2">{e.contact}</td>
                                    <td className="border border-gray-300 p-2">{e.address}</td>
                                    <td className="border-[2px] border-gray-300 group-hover:border-r-mainBg p-2">{e.final}</td>


                                </tr>
                            </Popover>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
