import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : {}
}

export const PostSlice = createSlice({
    name: "Posts",
    initialState,
    reducers: {
        getPost : (state,action)=>{
            state.posts = action.payload
        }
    },
});


export const {getPost} = PostSlice.actions
export default PostSlice.reducer