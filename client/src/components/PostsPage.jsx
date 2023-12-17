import React, { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ServerVariables } from "../utils/ServerVariables";
import { useDispatch, useSelector } from "react-redux";
import { eventRequest } from "../Helper/instance";
import { apiEndPoints } from "../utils/api";
import toast from "react-hot-toast";
import { updateEvent } from "../Redux/slices/EventAuthSlice";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();

  const handleDelete = (PostId) => {
    if (PostId) {
      eventRequest({
        url: apiEndPoints.deleteEventPost,
        method: "post",
        data: {id:PostId},
      })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.success);
            dispatch(updateEvent(res.data.event));
          } else {
            toast.error(res.data.error);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <img
        className="w-full h-42 object-cover"
        src={`http://localhost:5000/EventImages/posts/${post?.media}`}
        alt={post.description}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          {post.likes.length} likes
        </h2>
        <p className="text-gray-600 mb-2">{post.description}</p>
        <button
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
          onClick={() => handleDelete(post._id)}
        >
          <TrashIcon
            className="h-6 w-6"
          />
        </button>
      </div>
    </div>
  );
};

const PostList = ({ posts }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const NewPostButton = () => {
  const navigate = useNavigate()
  return (
    <button className="fixed bottom-4 right-4 bg-[#FFB992] text-white p-4 rounded-full hover:bg-[#e0b887]">
      <PlusIcon className="h-6 w-6 font-bold" onClick={()=> navigate(ServerVariables.addPost)}/>
    </button>
  );
};

const PostsPage = () => {
  const { event } = useSelector((state) => state.EventAuth);

  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen p-8">
        <PostList posts={event?.post} />
        <NewPostButton onClick={() => navigate(ServerVariables.addPost)} />
      </div>
    </>
  );
};

export default PostsPage;
