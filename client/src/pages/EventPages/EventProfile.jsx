import React from "react";
import EventSideBar from "../../components/EventSideBar";
import PostsPage from "../../components/PostsPage";
import ProfileCard from "../../components/ProfileCard";
import Myh1 from "../../components/Myh1";
import { useSelector } from "react-redux";
import { ServerVariables } from "../../utils/ServerVariables";

function EventProfile() {
  const {event} = useSelector(state => state.EventAuth)
  console.log('eventProfile',event)  
  return (
    <>
      <div className="flex">
        <EventSideBar />
        <div className="flex-grow flex-shrink min-h-screen">
            <ProfileCard event={event}/>
            <div className="text-center"><Myh1 title='posts'/></div>
            <PostsPage/>
        </div>
      </div>
    </>
  );
}

export default EventProfile;
