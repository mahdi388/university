import {useGetStudentsQuery,useAddStudentMutation,useDeleteStudentMutation} from '../redux/services/studentsApi'

function Students() {
    const {data:students,error,isError,isLoading}=useGetStudentsQuery()
    if (isError) {
        return <>{error.error}</>
    }if(isLoading){
        return <>Loading...</>
    }
    return <table>
        <tr>
            <th>کد</th>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>رشته تحصیلی</th>
        </tr>
        {students.map(student=><tr>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.family}</td>
            <td>{student.study_field}</td>
        </tr>)}
    </table>
}

export default Students;