// import logo from './logo.svg';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
// import Nav from './components/Specialorder/Nav/Nav';
import Home from './components/Specialorder/Home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
