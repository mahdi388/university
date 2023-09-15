import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const unitsApi=createApi({
    reducerPath:'units',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3020'}),
    endpoints:builder=>({
        getUnits:builder.query({
            query:()=>'units',
            providesTags:['units']
        }),
        addUnit:builder.mutation({
            query:newUnit=>({
                url:'units',
                method:'POST',
                body:JSON.stringify(newUnit),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags:['units']
        }),
        deleteUnit:builder.mutation({
            query:id=>({
                url:'units/'+id,
                method:'DELETE',
            }),
            invalidatesTags:['units']
        }),
        updateUnit:builder.mutation({
            query:({id,student,lessons})=>({
                url:'units/'+id,
                method:'PUT',
                body:JSON.stringify({ student,lessons }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags:['units']
        })
    })
})

export const {useGetUnitsQuery,useAddUnitMutation,useDeleteUnitMutation,useUpdateUnitMutation}=unitsApi
export default unitsApi