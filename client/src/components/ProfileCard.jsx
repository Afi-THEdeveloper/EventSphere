import React from "react";
import Button2 from "./Button2";
import EditIcon from "./icons/EditIcon";
import { useNavigate } from "react-router-dom";
import { ServerVariables } from "../utils/ServerVariables";

function ProfileCard({ event }) {
  const navigate = useNavigate()  
  return (
    <>
      <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words  w-full mb-6 shadow-lg rounded-xl mt-20">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src={`http://localhost:5000/EventImages/${event.profile}`}
                  className="shadow-xl rounded-full align-middle absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]  border-2 border-[#E0CDB6]"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full text-center mt-20">
              <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center"> 
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-400">
                    {event?.post?.length}
                  </span>
                  <span className="text-sm text-slate-400">Posts</span>
                </div>
                <div className="p-3 text-center"> 
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-400 hover:bg-slate-500">
                    {<EditIcon onClick={()=> navigate(ServerVariables.editProfileImage)}/>}
                  </span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-400">
                    {event?.followers.length}
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-400 font-bold leading-normal mb-1">
              {event.title}
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-300 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {event.place}
            </div>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-300 mb-4">
                  {`Owner:${event.ownerName},services:${event.services},phone:${
                    event?.phone
                  },${event.altPhone && event.altPhone},`}{" "}
                  <br />
                  {`officeAddress:${event.officeAddress}`}
                </p>
                <a
                  href="javascript:;"
                  className="font-normal text-slate-700 hover:text-slate-400"
                >
                  <Button2 text={<EditIcon/>} onClick={()=> navigate(ServerVariables.editEvent)}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
