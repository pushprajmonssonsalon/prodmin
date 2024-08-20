import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LOGIN_USERS } from "../services/crm/user.service";
import { PRO_LOGIN_USERS } from "../services/pro/user.service";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const isAdminCrm = localStorage.getItem('isAdmin') === 'crm';


  const handleLogin=async(e)=>{
    e.preventDefault();
    if(isAdminCrm){
      const user = await LOGIN_USERS({userName,password});
      if(user){
        localStorage.setItem('crmtoken',user.token)
        console.log(typeof user.role)
        localStorage.setItem('role',user.role==="1"?"admin":user.role==="2"?"finance":"operations")
        navigate("/dash-board")
      }else{
        console.log("crm logins erorrs")
      }
    }else{
      const user = await PRO_LOGIN_USERS({phoneNumber:userName,password});
      if(user){
        localStorage.setItem('protoken',user.token)
        localStorage.setItem('prorole',user.role)
        console.log(user)
        navigate("/Dashboard")
      }else{
        console.log("pro logins erorrs")
      }
    }
  }

  return (
    <div className="h-[100vh] flex flex-col items-center bg-custom-pattern bg-cover justify-center text-white">
      <div className="h-[390px] w-80 bg-blue-600/20 border border-blue-600/20 backdrop-blur-lg rounded-lg px-6 my-4 overflow-hidden">
        {/* ------------ Register -------------- */}
        <div className={`${open ? 'translate-y-[25px] transition-all' : 'translate-y-[400px] transition-all'}`}>
          <h2 className="text-3xl font-blod pb-6 text-center">Register</h2>
          <form className="flex flex-col items-center" action="">
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Username" type="text" />
              <FaUser className="absolute top-[35%] right-3" />
            </div>
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Email" type="email" />
              <MdMail className="absolute top-[35%] right-3"/>
            </div>
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Password" type="password" />
              <FaLock className="absolute top-[35%] right-3"/>
            </div>
            <button className="my-4 py-2 w-full rounded-full bg-blue-600">Register</button>
            <span className="text-[14px]">Already have an account? <span className="font-semibold cursor-pointer" onClick={() => setOpen(!open)}>Login</span></span>
          </form>
        </div>

        {/* ----------- Login ------------- */}

        <div className={`${!open ? 'translate-y-[-280px] transition-all' : 'translate-y-[400px] transition-all'}`}>
          <h2 className="text-3xl font-blod pb-6 text-center font-mono">Login</h2>
          <form className="flex flex-col items-center" onSubmit={handleLogin}>
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Username" type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} />
              <MdMail className="absolute top-[35%] right-3"/>
            </div>
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <FaLock className="absolute top-[35%] right-3"/>
            </div>
            {/* <div className="flex justify-between w-full">
            <div className="text-[14px] flex gap-2">
              <input type="checkbox" name="" id="" />
              <label htmlFor="" className="font-mono">Remember Me</label>
            </div>
            <span className="text-[14px] font-mono">Forget Password?</span>
            </div> */}
            <button className="my-4 py-2 w-full rounded-full bg-blue-600 font-mono" type="submit">Login</button>
            {/* <span className="text-[14px]">Don&apos;t have an account? <span className="font-semibold cursor-pointer" onClick={() => setOpen(!open)}>Register</span></span> */}
          </form>
        </div>
        
      </div>
      
    </div>
  );
}

export default Login