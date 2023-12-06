import {configureStore} from '@reduxjs/toolkit'
import  loadingSlice  from './slices/LoadingSlice'


const store = configureStore({
    reducer:{
        loadings:loadingSlice
    } 
})

export default store
