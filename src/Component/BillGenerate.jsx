import React, { useEffect, useState } from 'react'
import FormInput from '../utils/FormInput'
import ItemField from './ItemField'
import jsPDF from "jspdf"
import { v4 as uuidv4 } from "uuid"
import { useDispatch } from 'react-redux'
import { add } from '../redux/billSlice'
import ModalUtil from '../utils/ModalUtil'
export default function BillGenerate() {
    const [errors, seterrors] = useState({ Client: "", Contact: "", Address: "" })
    const [client, setclient] = useState("")
    const [contact, setcontact] = useState("")
    const [address, setAddress] = useState("")
    const [subTotal, setsubTotal] = useState(0)
    const [taxed, settaxed] = useState(0)
    const [final, setfinal] = useState(0)
    const [tax, settax] = useState(19)
    const [date, setDate] = useState(null)
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const [items, setitems] = useState([{
        key: uuidv4(),
        name: "",
        quantity: 0,
        price: 0,
        total: 0
    }])
    const checkFields = () => {
        seterrors({})
        let err = {}
        if (client == "") {
            err = { ...err, Client: "Client Name must be present." }
        }
        if (contact == "" || contact.length != 10) {
            err = { ...err, Contact: "Contact must be of 10 digits." }
        }
        if (!date) {
            err = { ...err, date: "Date must be present." }
        }
        if (address == "") {
            err = { ...err, Address: "Address must be present." }
        }
        items.forEach((e) => {
            if (!e.name || !e.price || !e.quantity || !e.total) {
                let errObj = {}
                !e.name && (errObj["name"] = "Required")
                !e.price && (errObj["price"] = "Required")
                !e.quantity && (errObj["quantity"] = "Required")
                !e.total && (errObj["total"] = "Required")
                err[e.key] = errObj
            }
        })
        seterrors(err)
        console.log(err)
        if (Object.keys(err).length == 0) {
            console.log("No error")
            return true
        }
        alert("Please Complete the Form")

        return false
    }
    const SaveToRedux = () => {
        console.log(client, contact, date, address, subTotal, taxed, final, items)
        if (!checkFields()) {
            return
        }
        console.log("ge")
        const obj = { client, contact, date, address, subTotal, taxed, final, items }
        dispatch(add(obj))
        setshow(true)

    }
    const findFinal = () => {
        let currPrice = 0
        items.forEach((e) => {

            if (e.total != "")
                currPrice += Number.parseInt(e.total)
        })
        let currTax = currPrice * (tax / 100)
        let currFinal = currPrice + currTax
        setsubTotal(currPrice)
        settaxed(currTax)
        setfinal(currFinal)
    }

    const downloadInvoice = () => {

        if (!checkFields()) {
            return
        }
        console.log("starts")
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text("Invoice", 10, 10);

        // Add invoice details
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 10, 20);
   
        doc.text("Customer Name: "+client, 10, 30);
        doc.text("Customer Contact Number: "+contact, 10, 40);
        doc.text("Customer Address: "+address, 10, 50);



        // Add table or itemized list
        doc.text("Products:", 10, 60);
        let coordinate=70
        items.forEach((item, index) => {
            doc.text(`${item.name} - ${item.quantity} x ${item.price} = $${item.total}`, 10, coordinate);
            coordinate+=10;
        });

        // Add total
        doc.text("SubTotal: $"+subTotal, 10, coordinate);
        doc.text("Tax Included: $"+taxed, 10, coordinate+10);
        doc.setFont("helvetica", "bold")
        doc.text("Net Bill Amount: $"+final, 10, coordinate+20,{});


        // Save the PDF
        doc.save("invoice.pdf");
    };
    useEffect(() => {
        findFinal()
    }, [items])
    const modalContent=()=>{
        return <p className='font-Quicksand text-lg'>Record is added. You can view in Dashboard</p>
    }
    const onCloseModal=()=>{
        setitems([{
            key: uuidv4(),
            name: "",
            quantity: 0,
            price: 0,
            total: 0
        }])
        setclient("")
        setAddress("")
        setDate(null)
        setcontact("")
        setsubTotal(0)
        settaxed(0)
        setfinal(0)
        seterrors({})
    }
    return (
        <div className='flex-1 w-full flex flex-col bg-[#f9f7f7c8] p-3 px-8  scrollbar '>
            {show&&<ModalUtil title={"Saved Successfully"} content={modalContent()} show={show} setshow={setshow} custom={onCloseModal}/>}
            <div className='flex flex-col items-center gap-2 my-2 px-2 font-Arsenal font-bold text-xl'>Fill The Bill Information<div className='w-full mx-auto my-2 h-[1px] bg-slate-800'></div></div>
            <div className='flex flex-wrap justify-center gap-3 md:justify-between  w-full'>
                <FormInput title="Client"
                    write="Enter Name"
                    type="text"
                    width="md:max-w-[30rem] w-3/4 my-1"
                    state={client}
                    setstate={setclient}
                    ErrorTitle={errors?.Client}
                    color='gray'
                    required={true}

                />
                <FormInput title="Contact"
                    write="Enter Number"
                    type="tel"
                    width="md:max-w-[10rem] w-3/4"
                    state={contact}
                    maxlength={10}
                    setstate={setcontact}
                    ErrorTitle={errors?.Contact}
                    color='gray'
                    required={true}

                />
                <FormInput title="Billing Date"
                    write="Enter Date"
                    type="date"
                    width="md:max-w-[20rem] w-3/4"
                    state={date}
                    setstate={setDate}
                    ErrorTitle={errors?.date}
                    color='gray'
                    required={true}

                />
                <FormInput title="Address"
                    write="Enter Address"
                    type="text"
                    width="md:max-w-[30rem] w-3/4"
                    state={address}
                    setstate={setAddress}
                    ErrorTitle={errors?.Address}
                    color='gray'
                    required={true}


                />



            </div>
            <div className='w-full '>
                <div className='flex flex-col items-center gap-2 my-2 px-2 font-Arsenal font-bold text-xl'>Add Products<div className='w-full mx-auto my-2 h-[1px] bg-slate-800'></div></div>

                {
                    items.map((e, i) => {

                        return <ItemField unique={e.key} idx={i} key={e.key} errors={errors} setitems={setitems} />
                    })
                }
                <div className='flex justify-between w-full'>

                    <button onClick={() => setitems(items => { return [...items, { key: uuidv4() }] })} className='flex text-white rounded-lg mx-auto font-Quicksand bg-[#2657f9] w-fit p-2 gap-2 group items-center justify-center'><i className='fa-solid fa-plus text-lightBg transition-all duration-300  group-hover:bg-mainBg group-hover:text-white p-2 rounded-xl bg-white border-[1px]'></i>Add A Field</button>
                </div>
            </div>
            <div className='flex flex-col items-center gap-2 my-2 mt-4 px-2 font-Arsenal font-bold text-xl'>Final Billing<div className='w-full mx-auto my-2 h-[1px] bg-slate-800'></div></div>
            <div className='flex-col-reverse flex md:flex-row gap-4 w-full items-center'>
                <button className='flex text-white rounded-lg mx-auto font-Quicksand bg-[#340a7e] w-fit h-fit p-2 gap-2 group items-center justify-center' onClick={downloadInvoice}><i className='fa-solid fa-download text-lightBg transition-all duration-300  group-hover:bg-mainBg group-hover:text-white p-2 rounded-xl bg-white border-[1px]' ></i>Download Invoice</button>
                <div className='flex md:w-1/2 flex-col flex-wrap justify-center items-center md:items-end  mt-3 gap-3 md:justify-between  w-full'>

                    <FormInput title="SubTotal"
                        write="Enter SubTotal"
                        type="number"
                        width="md:max-w-[20rem] w-3/4"
                        state={subTotal}
                        setstate={setsubTotal}
                        ErrorTitle={errors?.subTotal}
                        color='gray'
                        required={true}

                    />
                    <FormInput title={`Tax ${tax}%`}
                        write="Enter Tax Amount"
                        type="text"
                        width="md:max-w-[20rem] w-3/4"
                        state={taxed}
                        setstate={settaxed}
                        ErrorTitle={errors?.taxed}
                        color='gray'
                        required={true}

                    />
                    <FormInput title="Net Total"
                        write="Enter Final Total"
                        type="text"
                        width="md:max-w-[20rem] w-3/4"
                        state={final}
                        setstate={setfinal}
                        ErrorTitle={errors?.final}
                        color='gray'
                        required={true}

                    />
                    <button className='font-Jost text-lg p-2 bg-blue-600 px-4  rounded-lg hover:bg-blue-500 text-white' onClick={SaveToRedux}>Save</button>
                </div>
            </div>
        </div>
    )
}
