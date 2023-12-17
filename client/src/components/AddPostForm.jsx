import React, { useState } from "react";
import Myh1 from "./Myh1";
import AuthInput from "./AuthInput";
import Button1 from "./Button1";
import Button2 from "./Button2";
import { eventRequest } from "../Helper/instance";
import { apiEndPoints } from "../utils/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { upadteEvent } from "../Redux/slices/EventAuthSlice";
import { ServerVariables } from "../utils/ServerVariables";
import { useNavigate } from "react-router-dom";
import ErrorText from "./ErrorText";
import ImageCrop from "./ImageCrop";
import { hideLoading, showLoading } from "../Redux/slices/LoadingSlice";

function AddPostForm({ title }) {
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addCroppedImg = (file) => {
    console.log("parent", file);
    setImageFile(file)
  };

  const handleAdd = () => {
    const data = new FormData();
    console.log(imageFile);
    if (!imageFile) {
      setError("post file is required");
      return setTimeout(() => {
        setError("");
      }, 2000);
    }

    if(location.length){
      data.append("location", location)
    }
    if(description.length){
      data.append("description", description)
    }

    data.append("post", imageFile);
    console.log(data);
    dispatch(showLoading())
    eventRequest({
      url:apiEndPoints.addPost,
      method:'post',
      data:data
    }).then(res =>{
      dispatch(hideLoading())
      if(res.data.success){
        toast.success(res.data.success)
        dispatch(upadteEvent(res.data.event))
        navigate(ServerVariables.eventProfile)
      }else{
        toast.error(res.data.error)
      }
    }).catch(err =>{
      dispatch(hideLoading())
      toast.error(err.message)
    })
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full flex-col max-w-[400px] items-center space-y-3">
        <Myh1 title={title} />
        <div className="w-full mt-10">
          <AuthInput
            name="location"
            type="text"
            placeholder="Location(optional)"
            onChange={(e) => setLocation(e.target.value)}
          />
          <AuthInput
            name="description"
            type="text"
            placeholder="Description(optional)"
            onChange={(e) => setDescription(e.target.value)}
          />
          <ImageCrop onNewImageUrl={addCroppedImg} />
          {error && <ErrorText error={error} />}

          <div className="text-center">
            <Button1
              text="Update"
              style={{ marginTop: 10 }}
              onClick={handleAdd}
            />
            <Button2
              text="Cancel"
              style={{ marginTop: 10 }}
              onClick={() => window.history.back()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPostForm;
