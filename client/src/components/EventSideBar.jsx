import React from "react";
import { ServerVariables } from "../utils/ServerVariables";
import HomeIcon from "./icons/HomeIcon";
import SidebarItem from "./SidebarItem";
import MessageIcon from "./icons/MessageIcon";
import SearchIcons from "./icons/SearchIcons";
import NotificationIcon from "./icons/NotificationIcon";
import ProfileIcon from "./icons/ProfileIcon";
import LogoutIcon from "./icons/LogoutIcon";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/slices/EventAuthSlice";
import SubscribePlanIcon from "./icons/SubscribePlanIcon";
import { useNavigate } from "react-router-dom";

function EventSideBar() {
  const dispatch = useDispatch() 
  const navigate = useNavigate() 
  const sideBarItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      href: ServerVariables.eventHome,
    },
    {
      label: "Messages",
      icon: <MessageIcon />,
      href: ServerVariables.eventHome,
    },
    {
      label: "Search",
      icon: <SearchIcons />,
      href: ServerVariables.eventHome,
    },
    {
      label: "Notifications",
      icon: <NotificationIcon />,
      href: ServerVariables.eventHome,
    },
    {
      label: "Profile",
      icon: <ProfileIcon />,
      href: ServerVariables.eventProfile,
    },
    {
      label: "Subscriptions",
      icon: <SubscribePlanIcon />,
      href: ServerVariables.eventHome,
    },
    {
      label: "Logout",
      icon: <LogoutIcon />,
      href: ServerVariables.eventHome,
      onclick:()=>{
        dispatch(logout())
      },
    },
    
  ];

  return (
    <div className="flex-col w-[300px] hidden md:flex min-h-screen flex-shrink-0">
      <h1 className="uppercase text-3xl font-thin text-[#FFB992] mt-2 mx-2">EventSphere</h1>
      <div className="mt-8">
        {sideBarItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} href={item.href} label={item.label} onClick={item?.onclick} />
        ))}
      </div>
    </div>
  );
}

export default EventSideBar;
