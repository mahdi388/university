import {configureStore} from '@reduxjs/toolkit'
import {reducerPath,reducer,middleware} from './services/studentsApi'

export default configureStore({
    reducer:{
        [reducerPath]:reducer
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(middleware)
})