import React from "react";
import Myh1 from "../../components/Myh1";
import { useDispatch, useSelector } from "react-redux";
import Button1 from '../../components/Button1'
import { logout } from "../../Redux/slices/EventAuthSlice";



function EventHome() {
  const dispatch = useDispatch()
  const { event } = useSelector(state => state.EventAuth)


  const HandleLogout = ()=>{
    dispatch(logout())
  }
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full flex-col max-w-full md:max-w-[400px] items-center space-y-3">
        <Myh1 title={`Welcome ${event.title}`}/>
        <Button1 text='Logout' onClick={HandleLogout}/>
      </div>
    </div>
  );
}

export default EventHome;
