import { useState, useEffect, useRef} from "react";
import * as httpRequest from "./ultis/httpRequest";
import "./App.css"


function App() {
  const [ten, setTen]=useState('')
  const [mota, setMoTa]=useState('')
  const [courses, setCourses]=useState([])
  const [courseID, setCourseID]=useState()
  const [update,setupdate]= useState(false)
 const done=useRef();

const loadCourse= async()=>{
const resuilt=await httpRequest.getCourses('courses')
setCourses(resuilt)
} 
useEffect(()=>{
  loadCourse()
},[])

  const addCourse = async()=>{
    await httpRequest.postCourses('/courses',{
      ten,
      mota})
    // axios.post('http://localhost:3000/courses', {
    //   ten,
    //   mota
    // })
    done.current.classList.add('show')

    setTimeout(()=>{
      done.current.classList.remove('show')
    },3000)

    setTen('')
    setMoTa('')
    loadCourse()
  }

const deleteCourse =async (id)=>{
  await httpRequest.deleteCourse(`/courses/${id}`)
  loadCourse()
}

const updateCourse = async (id)=>{
   await httpRequest.putCourses(`/courses/${id}`,
   {
    ten,
    mota
  })
  setTen('')
  setMoTa('')
  loadCourse()
  setupdate(false)
}

const getCourseByID = async (id)=>{
  const result = await httpRequest.getCourses('/courses',{
    params:{
      id:id,
    }
  })
  setCourseID(id)
  setMoTa(result[0].mota)
  setTen(result[0].ten)
  setupdate(true)
}


  return (
    <div className="App">
      <div className="done" ref={done}>them thanh cong</div>
     <input placeholder='ten khoa hoc'value={ten} onChange={e=> setTen(e.target.value)}/>
     <input placeholder='Mo ta'value={mota} onChange={e=> setMoTa(e.target.value)} />
     {!update?
   (<button onClick={addCourse}>Them</button>):(<button onClick={()=>updateCourse(courseID)}>updateCourse</button>)
     }
   

   
<div>
  {courses.map((course)=>{
    return (<ul key={course.id}>
      <li>id:{course.id}</li>
      <li>name: {course.ten}</li>
      <li>decription: {course.mota}</li>
      <button onClick={()=>deleteCourse(course.id)}>Xóa</button>
      <button onClick={()=>getCourseByID(course.id)}>Update</button>
    </ul>)
  })}
</div>
    </div>
  );
}

export default App;
