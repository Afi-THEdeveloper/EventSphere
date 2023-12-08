import React, { useEffect } from "react";
import Myh1 from "../../components/Myh1";
import { useDispatch, useSelector } from "react-redux";
import Button1 from '../../components/Button1'
import { logout } from "../../Redux/slices/AuthSlice";
import toast from "react-hot-toast";


function UserHome() {
  const dispatch = useDispatch()
  const { message } = useSelector(state => state.Auth)

  useEffect(()=>{
    message.length && toast.success(message)
  },[])

  const HandleLogout = ()=>{
    dispatch(logout())
  }
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full flex-col max-w-full md:max-w-[400px] items-center space-y-3">
        <Myh1 title="Welcome to EventSphere" />
        <Button1 text='Logout' onClick={HandleLogout}/>
      </div>
    </div>
  );
}

export default UserHome;
