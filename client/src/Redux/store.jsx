import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slices/LoadingSlice";
import AuthSlice from "./slices/AuthSlice";
import EventAuthSlice from "./slices/EventAuthSlice";
import AdminAuthSlice from "./slices/AdminAuthSlice";
import  themeSlice  from "./slices/ThemeSlice";
import PostSlice from "./slices/PostSlice";


const store = configureStore({
  reducer: {
    loadings: loadingSlice,
    Auth: AuthSlice,
    EventAuth: EventAuthSlice,
    AdminAuth: AdminAuthSlice,
    SetTheme:themeSlice,
    getPosts : PostSlice
  },
});

export default store;
