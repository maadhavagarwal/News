//import logo from './logo.svg';
import './App.css';
import Header from './components/header';
//import Footer from './components/footer';
import Home from './components/home';import {Container} from 'react-bootstrap';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Login from './components/screen/login';
import Signup from './components/screen/signup';
import Course from './components/Course'
import CoursesState from './components/context/coursesState'
//import Admin from './components/screen/Admin';
//import EnrollScreen from './components/screen/EnrollScreen';
import Profile from './components/screen/profile';

function App() {
  return (
    <>
    <CoursesState>
          <BrowserRouter>
    <Header/>
     
    <main>
      <Container>
        <Routes>
        <Route path="/" element={<Home/>} extact></Route>
        <Route path="/signup" element={<Signup/>} extact></Route>
        <Route path="/login" element={<Login/>} extact></Route>
        <Route path="/profile" element={<Profile/>} extact></Route>
        
        </Routes>
      </Container>
      </main>   
    
    
    </BrowserRouter>
   </CoursesState>
    </>
  );
}

export default App;
