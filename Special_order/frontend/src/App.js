// import logo from './logo.svg';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
// import Nav from './components/Specialorder/Nav/Nav';
import Home from './components/Specialorder/Home/Home';
import Addorder from './components/Specialorder/Addorder/Addorder';
import Orderdetails from './components/Specialorder/Orderdetails/Orders';
import Updateorder from './components/Specialorder/Updateorder/Updateorder';
import './App.css';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addorder" element={<Addorder/>}/>
          <Route path="/orderdetails" element={<Orderdetails/>} />
          <Route path="/orderdetails/:id" element={<Updateorder/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
