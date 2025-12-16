import { Routes,Route } from 'react-router'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Venue from './pages/Venue'
import MyVenue from './pages/MyVenue'
import UploadImage from './pages/UploadImage'

function App() {

  return (
  <Routes>
    <Route path='/' element={<div>Home Page</div>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/signin' element={<SignIn/>} />
    <Route path='/venue' element={<Venue/>} />
    <Route path='/myvenue' element={<MyVenue/>} />
    <Route path='/upload/:id' element={<UploadImage/>} />
  </Routes>
  )
}

export default App
