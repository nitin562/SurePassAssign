import React, { useState } from "react";
import Leaf from "../utils/Leaf";
import Heading1 from "../utils/Heading1";
import FormInput from "../utils/FormInput";
import Design from "../utils/Design";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader"
import { useSelector } from "react-redux";
import validator from "validator";
import { message } from "antd";
export default function Login() {
  const nav = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [errors, seterrors] = useState({ Email: "", password: "" })
  const [load, setload] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  const AuthDb = useSelector(state=>state.Auth.db)

  const LoginDo = (e) => {
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

    if (password.length <= 5) {
      err = true
      seterrors((val) => {
        return { ...val, password: "Password must be of 6 characters atleast!" }


      })

    }
    if (err) {
      setload(false)
      return
    }
    if (!AuthDb[email]) {
      seterrors((val) => {
        return { ...val, Email: "Email is not Found" }
      })
    }
    else if (AuthDb[email].password != password) {
      seterrors((val) => {
        return { ...val, password: "Password is not correct" }
      })
    }
    else {
      messageApi.success("Congrats! You are logined now.", 3, () => {
        sessionStorage.setItem("email",email)
        sessionStorage.setItem("name",AuthDb[email].name)

        nav("/bill")
      })
    }
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
        <Heading1 title="Welcome Back!!" margin="my-4" />

        <div className="w-full flex flex-1 ">
          <div className="hidden  md:block flex-1 px-4 h-full">
            <Design />
          </div>
          <form className="flex flex-col items-center justify-center gap-y-2 w-full md:w-2/5 h-full " onSubmit={LoginDo} >
            <FormInput
              title="Email"
              write="Enter Email address"
              type="email"
              width="w-4/5"
              state={email}
              setstate={setemail}
              ErrorTitle={errors.Email}
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
              <span className="font-Quicksand text-green-500 hover:underline hover:underline-offset-3 cursor-pointer" onClick={() => nav("/sign")}>
                Register?
              </span>
              <button className="bg-white rounded-xl w-16 p-2 h-10 flex items-center justify-center tracking-wider text-red-500 font-Barlow hover:bg-mainBg hover:text-yellow-500">
                LOGIN
              </button>
            </div>
            <div className="h-7 w-10">{load && <Loader />}</div>


          </form>
        </div>
      </div>
    </div>
  );
}
