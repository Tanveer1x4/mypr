import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Counter";
import Navbar from './components/Navbar';
import Counter from './components/Counter';
import '../src/App.css'

const Private = ({Component})=>{
  const isAuthenticated = useSelector((state)=>state.user.isAuthenticated);
  console.log(isAuthenticated);
  return isAuthenticated? <Component/> : <Navigate to="/login"/>
}

 

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Private Component={Counter}/>}/>
      </Routes>
   
    </Router>
  );
};

export default App;
