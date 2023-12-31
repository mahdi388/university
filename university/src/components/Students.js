import {useGetStudentsQuery,useAddStudentMutation,useDeleteStudentMutation} from '../redux/services/studentsApi'
import {useAddUnitMutation,useDeleteUnitMutation} from '../redux/services/unitsApi'
import '../styles/students.scss'
import { useState } from 'react'

function Students() {
    const {data:students,error,isError,isLoading}=useGetStudentsQuery()
    const [addStudent,{isLoading:isAddingStudent}]=useAddStudentMutation()
    const [deleteStudent]=useDeleteStudentMutation()
    const [pager,setPager]=useState(1)
    const [addUnit,{}]=useAddUnitMutation()
    const [deleteUnit]=useDeleteUnitMutation()
    const addStudentHandler=async event=>{
        event.preventDefault()
        try {
            var id=students[students.length-1].id+1
        } catch (error) {
            var id=1
        }
        await addStudent({
            id:id,
            name:event.target['name'].value,
            family:event.target['family'].value,
            study_field:event.target['study-field'].value
        })
        event.target.reset()
        addUnit({student:id,lessons:[]})
    }
    if (isError) {
        return <>خطا {error.status}</>
    }if(isLoading){
        return <>Loading...</>
    }
    if(students.length%10==0){
        var pageLen=students.length/10
    }else{
        var pageLen=parseInt(students.length/10)+1
    }
    const pagination=[]
    for (let i = 0; i <pageLen; i++) {
        pagination.push(students.slice(i*10,i*10+10))
    }
    if(students.length==0){
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
    const deleteStudentHandler=async studentId=>{
        await deleteStudent(studentId)
        fetch('http://localhost:3020/units/?student='+studentId)
        .then(res=>res.json())
        .then(res=>deleteUnit(res[0].id))
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
                        <th>نام خانوادگی</th>
                        <th>رشته تحصیلی</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pagination[pager-1].map(student=><tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.family}</td>
                        <td>{student.study_field}</td>
                        <td><i className='fa fa-trash' onClick={()=>deleteStudentHandler(student.id)}></i></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <form onSubmit={addStudentHandler}>
            <div>
                <label htmlFor="name">نام:</label>
                <input type="text" id='name'/>
            </div>
            <div>
                <label htmlFor="family">نام خانوادگی:</label>
                <input type="text" id='family'/>
            </div>
            <div>
                <label htmlFor="study-field">رشته تحصیلی:</label>
                <input type="text" id='study-field'/>
            </div>
            <button type="submit" disabled={isAddingStudent}>اضافه کردن دانشجو</button>
        </form>
    </main>
}

export default Students;