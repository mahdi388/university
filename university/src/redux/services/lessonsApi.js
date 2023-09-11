import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const lessonsApi=createApi({
    reducerPath:'lessons',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3020'}),
    endpoints:builder=>({
        getLessons:builder.query({
            query:()=>'lessons',
            providesTags:['lessons']
        }),
        addLesson:builder.mutation({
            query:newLesson=>({
                url:'lessons',
                method:'POST',
                body:newLesson
            }),
            invalidatesTags:['lessons']
        }),
        deleteLesson:builder.mutation({
            query:id=>({
                url:'lessons/'+id,
                method:'DELETE',
            }),
            invalidatesTags:['lessons']
        })
    })
})

export const {useGetLessonsQuery,useAddLessonMutation,useDeleteLessonMutation}=lessonsApi
export default lessonsApi