import React, { useEffect } from "react";
import Myh1 from "../../components/Myh1";
import { useDispatch, useSelector } from "react-redux";
import Button1 from "../../components/Button1";
import { logout } from "../../Redux/slices/AuthSlice";
import toast from "react-hot-toast";

function UserHome() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);

  const HandleLogout = () => {
    dispatch(logout());
  };

  return (
    // <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
    //   <div className="flex w-full flex-col max-w-full md:max-w-[400px] items-center space-y-3">
    //     <Myh1 title={`Welcome  ${user.username}`}/>
    //     <Button1 text='Logout' onClick={HandleLogout}/>
    //   </div>
    // </div>
    <>
      {/* <div class="bg-black w-[250px] h-full absolute start-0"></div>

      <div class="flex bg-yellow-100 h-[120px] w-[870px] ml-[250px]">
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
        <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
      </div> */}

      {/* <div class="w-[870px] h-full bg-violet-600 ml-[250px] absolute"></div>
      <div class="w-[400px]  ml-[699px] h-full bg-red-900 end-0 absolute top-0"></div> */}
      <div className="flex gap-[200px]">
        <div class="bg-white w-[250px] h-full absolute">
          
        </div>

        <div className="flex-col">
          <div class="flex bg-yellow-100 w-[890px] ml-[250px]">
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
            <div class="h-16 w-16 bg-gray-500 border-violet-600 border-2 rounded-full m-3"></div>
          </div>

          <div class="w-[890px] h-full ml-[250px]">
            <div className="bg-pink-200 w-20 h-[100px]"></div>
            <div className="bg-red-500 w-20 h-[100px]"></div>
          </div> 

        </div>

        <div class="w-[400px]  ml-[699px] h-full bg-gray-300 end-0 absolute top-0"></div>
      </div>
    </>
  );
}

export default UserHome;
