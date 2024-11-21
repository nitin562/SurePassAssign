import React, { useState } from "react";
import Leaf from "../utils/Leaf";
import Heading1 from "../utils/Heading1";
import FormInput from "../utils/FormInput";
import Design from "../utils/Design";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader"
import validator from "validator";
import { useDispatch } from "react-redux";
import { Register } from "../redux/authSlice";
import { message } from "antd";
export default function Sign() {
  const nav = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [errors, seterrors] = useState({});
  const [password, setpassword] = useState("");
  const [load, setload] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch()
  const RegisterInRedux = (e) => {
    e.preventDefault()
    setload(true)
    seterrors({})
    let err = false
    if (!validator.isEmail(email)) {
      seterrors((val) => {
        return { ...val, Email: "Email is invalid!" }
      })
      err = true
    }
    if (!validator.isAlpha(name) && name.length < 3) {
      err=true
      seterrors((val) => {
        return { ...val, name: "Name must contains atleast 3 alphabets." }

      })

    }
    if (password.length <= 5) {
      err = true
      seterrors((val) => {
        return { ...val, password: "Password must be of 6 characters atleast!" }


      })
      
    }
    if(err){
      setload(false)
      return
    }
    const payload = { name, email, password }
    dispatch(Register(payload))
    messageApi.success("Congrats! You are registered. Please Login",3,()=>{
      nav("/")
    })
    setload(false)
  }
  return (
    <div className="h-full w-full scrollbar bg-mainBg flex items-center justify-center">
      {contextHolder}
      <Leaf pos1="top-0" pos2="left-0" rotate="rotate" color="bg-lightBg" />
      <Leaf pos1="bottom-0" pos2="right-0" rotate="rotate" color="bg-lightBg" />
      <Leaf
        pos1="bottom-0"
        pos2="left-0"
        rotate="rotate-90"
        color="bg-lightBg"
      />
      <Leaf pos1="top-0" pos2="right-0" rotate="rotate-90" color="bg-lightBg" />
      <div className="w-[90%] bg-lightBg h-3/4 flex flex-col rounded-3xl shadow-[0_0.5rem_1rem_#000] z-20 p-4">
        <Heading1 title="Welcome!!" margin="my-4" />

        <div className="w-full flex flex-1 ">
          <div className="hidden  md:block flex-1 px-4 h-full">
            <Design />
          </div>
          <form
            className="flex flex-col items-center justify-center w-full md:w-2/5 h-full " onSubmit={RegisterInRedux}

          >
            <FormInput
              title="Name"
              write="Enter User Name"
              type="text"
              width="w-4/5"
              state={name}
              setstate={setname}
              ErrorTitle={errors?.name}
            />
            <FormInput
              title="email"
              write="Enter email Address"
              type="email"
              width="w-4/5"
              state={email}
              setstate={setemail}
              ErrorTitle={errors?.Email}
            />

            <FormInput
              title="Password"
              write="Enter password"
              type="password"
              width="w-4/5"
              state={password}
              setstate={setpassword}
              ErrorTitle={errors.password}
            />
            <div className="flex justify-between items-center w-4/5 mt-2 text-sm ">
              <span
                className="font-Quicksand text-green-500 hover:underline hover:underline-offset-3 cursor-pointer"
                onClick={() => nav("/")}
              >
                login
              </span>
              <button className="bg-white rounded-xl w-16 p-2 h-10 flex items-center justify-center tracking-wider text-red-500 font-Barlow hover:bg-mainBg hover:text-yellow-500">
                SignUp
              </button>
            </div>
            <div className="h-7 w-10">{load && <Loader />}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
