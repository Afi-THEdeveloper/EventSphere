import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { ServerVariables } from "../../utils/ServerVariables";
import { adminRequest } from "../../Helper/instance";
import { apiEndPoints } from "../../utils/api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/slices/LoadingSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Search1 from "../../components/Search1";


function EventsTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searched, setSearched] = useState("");
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    dispatch(showLoading());
    adminRequest({
      url: apiEndPoints.getEvents,
      method: "get",
    })
      .then((res) => {
        dispatch(hideLoading());
        if (res.data.success) {
          setEvents(res.data.events);
        }
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };

  const blockEvent = async (id) => {
    const isBlocked = events.find((plan) => plan._id === id)?.isBlocked;
    const result = await Swal.fire({
      title: isBlocked ? "Unblock Confirmation" : "Block Confirmation",
      text: isBlocked
        ? "Are you sure you want to Unblock this plan?"
        : "Are you sure you want to Block this plan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isBlocked ? "Unblock" : "Block",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      dispatch(showLoading());

      adminRequest({
        url: apiEndPoints.blockEvent,
        method: "post",
        data: { id: id },
      }).then((res) => {
        dispatch(hideLoading());
        if (res.data.success) {
          toast.success(res.data.success);
          getEvents();
        } else {
          toast.error(res.data.error);
        }
      });
    }
  };


  return (
    <>
      <AdminNavbar />
      <div className="min-h-full">
        <header className="bg-black shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              EVENTS 
            </h2>
            <div className="relative">
              <Search1 search='Search Event' value={searched}  onChange={(e)=> setSearched(e.target.value)}/>
            </div>
          </div>
        </header>

        <main>
          <div className="mt-8 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              {/* Your content */}
              <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead className="bg-gray-400">
                  <tr>
                    <th className="border-b p-4">Sl No:</th>
                    <th className="border-b p-4">Event</th>
                    <th className="border-b p-4">Email</th>
                    <th className="border-b p-4">Phone</th>
                    <th className="border-b p-4">Plan expiry</th>
                    <th className="border-b p-4">Verified</th>
                    <th className="border-b p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.filter((item)=>{
                    return searched.toLowerCase() === "" ? item
                    : item.title.toLowerCase().includes(searched) ||  
                      item.phone.toString().includes(searched)       ||
                      item.email.toLowerCase().includes(searched)    
                  }).map((event, index) => {
                    return (
                      <tr key={event._id}>
                        <td className="border-b p-4 text-center">
                          {index + 1}
                        </td>
                        <td className="border-b p-4 text-center">
                          {event.title}
                        </td>
                        <td className="border-b p-4 text-center">
                          {event.email}
                        </td>
                        <td className="border-b p-4 text-center">
                          {event.phone}
                        </td>
                        <td className="border-b p-4 text-center">
                          {event.selectedPlan? event.selectedPlan.expiry.toDateString() : 'No plan'}
                        </td>
                        <td className="border-b p-4 text-center">
                          {event.isVerified ? 'Yes' : 'No'}
                        </td>
                        <td className="text-center">

                          <button
                            className={`${
                              event.isBlocked ?"bg-red-500" : "bg-green-500"
                            } text-white px-2 py-1 rounded-full w-20 md:w-24 h-8 md:h-10`}
                            onClick={() => {
                              blockEvent(event._id);
                            }}
                          >
                            {event.isBlocked ? "Blocked" : "Block"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default EventsTable;
