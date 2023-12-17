import React, { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ServerVariables } from "../utils/ServerVariables";
import { useSelector } from "react-redux";

const PostCard = ({ post, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <img
        className="w-full h-42 object-cover"
        src={`http://localhost:5000/EventImages/posts/${post?.media}`}
        alt={post.description}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.description}</h2>
        <p className="text-gray-600 mb-2">{post.description}</p>
        <button
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
          onClick={() => onDelete(post.id)}
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
    
  );
};

const PostList = ({ posts, onDelete }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
};

const NewPostButton = ({ onClick }) => {
  const navigate = useNavigate()
  return (
    <button
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-700"
      onClick={onClick}
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  );
};

const PostsPage = ({addPost}) => {
  const {event} = useSelector(state => state.EventAuth)
  // const [posts, setPosts] = useState([
  //   // Your initial posts data, each post should have an id, image, title, and description
  //   { id: 1, image: "/images/userImages/hub1.png", title: "Post Title", description: "Post Description" },
  //   { id: 2, image: "/images/userImages/hub1.png", title: "Post Title", description: "Post Description" },
  //   { id: 3, image: "/images/userImages/hub1.png", title: "Post Title", description: "Post Description" },
  //   { id: 4, image: "/images/userImages/hub1.png", title: "Post Title", description: "Post Description" },
  //   { id: 5, image: "/images/userImages/hub1.png", title: "Post Title", description: "Post Description" },
  //   { id: 6, image: "/images/userImages/hub1.png", title: "Post Title", description: "Post Description" },
  //   { id: 7, image: "/images/userImages/hub1.png", title: "Post Title", description: "Post Description" },
  //   { id: 8, image: "/images/userImages/hub1.png", title: "Post Title", description: "Post Description" },
  // ]);
  
  const navigate = useNavigate()

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleNewPost = () => {
    // Add your logic to handle adding a new post
    // You may open a modal or navigate to a new page for creating a new post
    // For simplicity, let's just add a placeholder post for now
    setPosts((prevPosts) => [
      ...prevPosts,
      {
        id: Date.now(),
        image: "placeholder-image-url",
        title: "New Post",
        description: "New Post Description",
      },
    ]);
  };

  return (
    <>
    <div className="min-h-screen p-8">
      <PostList posts={event?.post} onDelete={handleDelete} />
      <NewPostButton onClick={()=>navigate(ServerVariables.addPost)}/>
    </div>
    </>
  );
};

export default PostsPage;