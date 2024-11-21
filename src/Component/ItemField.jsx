import React, { useEffect, useState } from 'react'
import FormInput from '../utils/FormInput'
import { Popover } from 'antd';

export default function ItemField({unique, idx, setitems, errors }) {
    const [name, setname] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [total, setTotal] = useState("")

    useEffect(() => {
        if (price && quantity) {
            const totalVal = Number.parseInt(price) * Number.parseInt(quantity)
            setTotal(totalVal)
       
            
        }
        setitems(items => {
            let currItems=[...items]
            currItems[idx] = {...currItems[idx],name, price, quantity, total}
            return currItems
        })

    }, [name, price, quantity,total])
    
    const Delete = () => {
        setitems(items => {
            let curr = items
            console.log(curr)
            items = curr.filter((e, i) => {
                return i != idx
            })
            console.log(items)
            return items


        })
    }
    const popContent = () => {
        return <i className='fa-solid fa-trash p-2 text-xl cursor-pointer hover:text-red-500' onClick={Delete}></i>
    }
    return (
        <Popover content={popContent} placement='topRight'>
            <div className='flex flex-wrap border-b-[1px] border-lightBg/20 justify-center gap-3 py-1 hover:bg-[#ece9ff] border-r-[2px] my-1 border-r-transparent duration-300 transition-all hover:border-mainBg cursor-pointer w-full'>
                <FormInput title="Item"
                    write="Enter Item Detail"
                    type="text"
                    width="md:max-w-[15rem] w-3/4"
                    state={name}
                    setstate={setname}
                    ErrorTitle={errors[unique]?.name}
                    color='gray'
                    required={true}
                />
                <FormInput title="Quantity"
                    write="Enter Number"
                    type="number"
                    width="md:max-w-[10rem] w-3/4"
                    state={quantity}
                    setstate={setQuantity}
                    ErrorTitle={errors[unique]?.quantity}
                    color='gray'

                />
                <FormInput title="Price $"
                    write="Enter Number"
                    type="number"
                    width="md:max-w-[15rem] w-3/4"
                    state={price}
                    setstate={setPrice}
                    ErrorTitle={errors[unique]?.price}
                    color='gray'

                />
                <FormInput title="Total Price $"
                    write="Enter Number"
                    type="number"
                    width="md:max-w-[20rem] w-3/4"
                    state={total}
                    setstate={setTotal}
                    ErrorTitle={errors[unique]?.total}
                    color='gray'


                />
            </div>
        </Popover>
    )
}
