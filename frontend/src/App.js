import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Home from './Home';
import SignIn from './SignIn';


function App() {
  return (
   <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}></Route>
       <Route path='/signup' element={<SignUp/>}></Route>
       <Route path='/signin' element={<SignIn/>}></Route>

    </Routes>
   </BrowserRouter>
    
  );
}

export default App;
