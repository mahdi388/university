import {useGetLessonsQuery,useAddLessonMutation,useDeleteLessonMutation} from '../redux/services/lessonsApi'
import {useGetMastersQuery} from '../redux/services/mastersApi'
import '../styles/students.scss'
import { useState } from 'react'

function Lessons() {
    const {data:masters}=useGetMastersQuery()
    const {data:lessons,error,isError,isLoading}=useGetLessonsQuery()
    const [addLesson,{isLoading:isAddingLesson}]=useAddLessonMutation()
    const [deleteLesson]=useDeleteLessonMutation()
    const [pager,setPager]=useState(1)
    const addLessonHandler=event=>{
        event.preventDefault()
        addLesson({
            id:lessons[lessons.length-1].id+1,
            name:event.target['name'].value,
            units:Number(event.target['units'].value),
            master:Number(event.target['master'].value)
        })
        event.target.reset()
    }
    if (isError) {
        return <>خطا {error.status}</>
    }if(isLoading){
        return <>Loading...</>
    }
    if(lessons.length%10==0){
        var pageLen=lessons.length/10
    }else{
        var pageLen=parseInt(lessons.length/10)+1
    }
    const pagination=[]
    for (let i = 0; i <pageLen; i++) {
        pagination.push(lessons.slice(i*10,i*10+10))
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
                        <th>شماره دانشجویی</th>
                        <th>نام</th>
                        <th>تعداد واحدها</th>
                        <th>استاد</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pagination[pager-1].map(lesson=><tr key={lesson.id}>
                        <td>{lesson.id}</td>
                        <td>{lesson.name}</td>
                        <td>{lesson.units}</td>
                        <td>{masters.filter(master=>master.id==lesson.master)[0].name+' '+masters.filter(master=>master.id==lesson.master)[0].family}</td>
                        <td><i className='fa fa-trash' onClick={()=>deleteLesson(lesson.id)}></i></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <form onSubmit={addLessonHandler}>
            <div>
                <label htmlFor="name">نام:</label>
                <input type="text" id='name'/>
            </div>
            <div>
                <label htmlFor="units">تعداد واحدها:</label>
                <input type="number" id='units'/>
            </div>
            <div>
                <label htmlFor="master">استاد:</label>
                <select id="master">
                    {masters.map(master=><option key={master.id} value={master.id}>{master.name+' '+master.family}</option>)}
                </select>
            </div>
            <button type="submit" disabled={isAddingLesson}>اضافه کردن درس</button>
        </form>
    </main>
}

export default Lessons;