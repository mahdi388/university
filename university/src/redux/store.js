import {configureStore} from '@reduxjs/toolkit'
import {reducerPath,reducer,middleware} from './services/studentsApi'
import lessonsApi from './services/lessonsApi'
import mastersApi from './services/mastersApi'
import unitsApi from './services/unitsApi'

export default configureStore({
    reducer:{
        [reducerPath]:reducer,
        [lessonsApi.reducerPath]:lessonsApi.reducer,
        [mastersApi.reducerPath]:mastersApi.reducer,
        [unitsApi.reducerPath]:unitsApi.reducer
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(middleware).concat(lessonsApi.middleware).concat(mastersApi.middleware).concat(unitsApi.middleware)
})