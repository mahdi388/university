import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const mastersApi=createApi({
    reducerPath:'masters',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3020'}),
    endpoints:builder=>({
        getMasters:builder.query({
            query:()=>'masters',
            providesTags:['masters']
        }),
        addMaster:builder.mutation({
            query:newMaster=>({
                url:'masters',
                method:'POST',
                body:newMaster
            }),
            invalidatesTags:['masters']
        }),
        deleteMaster:builder.mutation({
            query:id=>({
                url:'masters/'+id,
                method:'DELETE',
            }),
            invalidatesTags:['masters']
        })
    })
})

export const {useGetMastersQuery,useAddMasterMutation,useDeleteMasterMutation}=mastersApi
export default mastersApi