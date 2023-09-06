import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const studentsApi=createApi({
    reducerPath:'students',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3020'}),
    endpoints:builder=>({
        getStudents:builder.query({
            query:()=>'students',
            providesTags:['students']
        }),
        addStudent:builder.mutation({
            query:newStudent=>({
                url:'students',
                method:'POST',
                body:newStudent
            }),
            invalidatesTags:['students']
        }),
        deleteStudent:builder.mutation({
            query:id=>({
                url:'students/'+id,
                method:'DELETE',
            }),
            invalidatesTags:['students']
        })
    })
})

export const {useGetStudentsQuery,useAddStudentMutation,useDeleteStudentMutation,reducerPath,reducer,middleware}=studentsApi