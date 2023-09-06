import './styles/main.scss'
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom'
import NotFound from './components/NotFound';
import Students from './components/Students';
import Lessons from './components/Lessons';
import Masters from './components/Masters';
import Units from './components/Units';

function App() {
  const navigate=useNavigate()
  return <>
    <nav className='nav-bar'>
      <ul>
        <li onClick={() => navigate('/students')}>
          <div></div>
          <span>دانشجویان</span>
          <div></div>
        </li>
        <li onClick={() => navigate('/lessons')}>
          <div></div>
          <span>دروس</span>
          <div></div>
        </li>
        <li onClick={() => navigate('/masters')}>
          <div></div>
          <span>اساتید</span>
          <div></div>
        </li>
        <li onClick={() => navigate('/units')}>
          <div></div>
          <span>واحدها</span>
          <div></div>
        </li>
      </ul>
      <div className="search">
        <input type="text" placeholder='جست‌ و جو'/>
        <div>
          <i className="fa fa-search"></i>
        </div>
      </div>
    </nav>
    {/* <main> */}
      <Routes>
        <Route path='/students' element={<Students/>}></Route>
        <Route path='/lessons' element={<Lessons/>}></Route>
        <Route path='/masters' element={<Masters/>}></Route>
        <Route path='/units' element={<Units/>}></Route>
        <Route path='/' element={<Navigate to='/students'/>}></Route>
        <Route path='/not-fount' element={<NotFound/>}></Route>
        <Route path='*' element={<Navigate to='/not-fount'/>}></Route>
      </Routes>
    {/* </main> */}
  </>;
}

export default App;
