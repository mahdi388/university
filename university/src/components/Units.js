import {useGetStudentsQuery} from '../redux/services/studentsApi'
import {useGetLessonsQuery} from '../redux/services/lessonsApi'
import {useGetUnitsQuery,useUpdateUnitMutation} from '../redux/services/unitsApi'
import '../styles/units.scss'
import { useState,useEffect } from 'react'

function Units() {
    const {data:students,error,isError,isLoading:isStudentsLoading}=useGetStudentsQuery()
    const [updateUnit]=useUpdateUnitMutation()
    var {data:units,isLoading:isUnitsLoading}=useGetUnitsQuery()
    const {data:lessons,isLoading:isLessonsLoading}=useGetLessonsQuery()
    const [pager,setPager]=useState(1)
    const [selectedStudent,setSelectedStudent]=useState(null)
    const [selectedUnit,setSelectedUnit]=useState(null)
    if (isError) {
        return <>خطا {error.status}</>
    }if(isStudentsLoading || isUnitsLoading || isLessonsLoading){
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
    const selectStudent=(student)=>{
        setSelectedStudent(student)
        setSelectedUnit(units.filter(unit=>unit.student===student.id)[0])
    }
    const getUnitsLen=()=>{
        let len=0
        for (const lessonId of selectedUnit.lessons) {
            len+=lessons.filter(lesson=>lesson.id==lessonId)[0].units
        }
        return len
    }
    const changeCheckBox=async event=>{
        if(event.target.checked && getUnitsLen()+Number(event.target.dataset.units)>20){
            alert('شما نمی‌توانید بیشتر از 20 واحد انتخاب کنید.')
            return
        }
        let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let lessons = [];
        checkboxes.forEach((checkbox) => {
            lessons.push(Number(checkbox.value));
        });
        await updateUnit({id:selectedUnit.id,student:selectedStudent.id,lessons:lessons})
        fetch('http://localhost:3020/units/')
        .then(res=>res.json())
        .then(res=>units=res)
        .then(()=>setSelectedUnit(units.filter(unit => unit.student === selectedStudent.id)[0]))
    }
    return <main>
        <div className='unit-selection'>
            <div>دانشجو: {selectedStudent ? selectedStudent.name+' '+selectedStudent.family:"دانشجویی انتخاب نشده است."}</div>
            {selectedStudent && <>
                <p>{getUnitsLen()}/20 واحد</p>
                <form>
                    {lessons.map(lesson=><div key={lesson.id}>
                        <input type='checkbox' value={lesson.id} data-units={lesson.units} checked={selectedUnit.lessons.includes(Number(lesson.id))} onChange={changeCheckBox}/>
                        <span>{lesson.name} - {lesson.units}واحد</span>
                    </div>)}
                </form>
            </>}
        </div>
        <div className='students'>
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
                        <td onClick={()=>selectStudent(student)} className='choose'>انتخاب</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </main>
}

export default Units;