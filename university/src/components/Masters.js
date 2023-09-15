import {useGetMastersQuery,useAddMasterMutation,useDeleteMasterMutation} from '../redux/services/mastersApi'
import {useGetLessonsQuery,useDeleteLessonMutation} from '../redux/services/lessonsApi'
import '../styles/students.scss'
import { useState } from 'react'

function Masters() {
    const {data:lessons,isLoading:isLessonsLoding}=useGetLessonsQuery()
    const [deleteLesson]=useDeleteLessonMutation()
    const {data:masters,error,isError,isLoading:isMastersLoding}=useGetMastersQuery()
    const [addMaster,{isLoading:isAddingMaster}]=useAddMasterMutation()
    const [deleteMaster]=useDeleteMasterMutation()
    const [pager,setPager]=useState(1)
    const addMasterHandler=event=>{
        event.preventDefault()
        addMaster({
            name:event.target['name'].value,
            family:event.target['family'].value,
        })
        event.target.reset()
    }
    if (isError) {
        return <>خطا {error.status}</>
    }if(isLessonsLoding || isMastersLoding){
        return <>Loading...</>
    }
    if(masters.length%10==0){
        var pageLen=masters.length/10
    }else{
        var pageLen=parseInt(masters.length/10)+1
    }
    const pagination=[]
    for (let i = 0; i <pageLen; i++) {
        pagination.push(masters.slice(i*10,i*10+10))
    }
    if(masters.length==0){
        pagination.push([])
    }
    const increasePager=()=>{
        if (pager!==pageLen) {
            setPager((prevPage)=>(prevPage+1))
        }
    }
    const decreasePager=()=>{
        if (pager!==1) {
            setPager(pager-1)
        }
    }
    const deleteMasterHandler= async id=>{
        await deleteMaster(id)
        lessons.filter(lesson=>lesson.master==id).forEach(async lesson => {
            await deleteLesson(lesson.id)
        });
        
    }
    return <main>
        <div>
            <div>
                <div onClick={increasePager}>&lt;</div>
                <div>{pager}/{pageLen}</div>
                <div  onClick={decreasePager}>&gt;</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>شماره پرسنلی</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>دروس</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pagination[pager-1].map(master=><tr key={master.id}>
                        <td>{master.id}</td>
                        <td>{master.name}</td>
                        <td>{master.family}</td>
                        <td>{lessons.filter(lesson=>lesson.master==master.id).map(lesson=>lesson.name).join(' - ')}</td>
                        <td><i className='fa fa-trash' onClick={()=>deleteMasterHandler(master.id)}></i></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <form onSubmit={addMasterHandler}>
            <div>
                <label htmlFor="name">نام:</label>
                <input type="text" id='name'/>
            </div>
            <div>
                <label htmlFor="family">نام خانوادگی:</label>
                <input type="text" id='family'/>
            </div>
            <button type="submit" disabled={isAddingMaster}>اضافه کردن استاد</button>
        </form>
    </main>
}
export default Masters;