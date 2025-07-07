import React,{useState} from 'react'
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6"


function PasswordInput({value,onChange,placeholder="Password"}) {

    const [isShowPassword,SetIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        SetIsShowPassword(!isShowPassword)
    }
    

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
      <input value={value} onChange={onChange} placeholder={placeholder} type={isShowPassword ? 'text' : 'password'} className='bg-transparent outline-none w-full text-sm py-3 mr-3 rounded'/>
      {isShowPassword ? <FaRegEye size={22} className="text-blue-600 cursor-pointer" onClick={() => toggleShowPassword()}/> : <FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={() => toggleShowPassword()}/>}
    </div>
  )
}

export default PasswordInput