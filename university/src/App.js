import './styles/main.scss'
import {Routes,Route,useNavigate} from 'react-router-dom'

function App() {
  const navigate=useNavigate()
  return <>
    <nav className='nav-bar'>
      <ul>
        <li onClick={() => navigate('/')}>
          <div></div>
          <span>دانشجویان</span>
          <div></div>
        </li>
        <li onClick={() => navigate('/movies')}>
          <div></div>
          <span>دروس</span>
          <div></div>
        </li>
        <li onClick={() => navigate('/about-us')}>
          <div></div>
          <span>اساتید</span>
          <div></div>
        </li>
        <li onClick={() => navigate('/about-us')}>
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
    <main>
      <Routes>
      </Routes>
    </main>
  </>;
}

export default App;
