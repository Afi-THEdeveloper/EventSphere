import {configureStore} from '@reduxjs/toolkit'
import  loadingSlice  from './slices/LoadingSlice'
import AuthSlice from './slices/AuthSlice'


const store = configureStore({
    reducer:{
        loadings:loadingSlice,
        Auth:AuthSlice
    } 
})

export default store
