import React from "react";

export default function FormInput({ title, write, type, width,state,setstate,ErrorTitle="",font="font-Quicksand",size="text-xl",color="text-yellow-500",required=false,changeFunc=null,maxlength=undefined }) {
  const OnChangeDo=(e)=>{
    if(changeFunc){
      changeFunc(e.target.value)
    }
    else{
      setstate(e.target.value)
    }
  }
  return (
    <div className={` my-2 ${width} relative`}>
      <div className="text-[0.8rem] flex items-center rounded-full tracking-wide h-fit px-2 z-10 text-white  font-Abel absolute mt-[-0.5rem] ml-4 w-fit bg-lightBg ">
        {title} {required&&<p className="w-fit ml-2 text-red-500] ">*</p>}
      </div>
      <input
        type={type}
        maxLength={maxlength}
        className={`${font} w-full ${size} bg-transparent border-2 border-slate-300 outline-none p-3 ${color} rounded-lg placeholder:text-sm placeholder:font-Jost hover:border-emerald-400`}
        placeholder={write}
        value={state||""}
        onChange={OnChangeDo}
      ></input>
      <div className="w-full min-h-[1.1rem] mt-1 ml-1 font-Barlow  hover:cursor-default text-[0.7rem] tracking-wider rounded-full text-red-500" >{ErrorTitle?ErrorTitle:""}</div>
    </div>
  );
}
