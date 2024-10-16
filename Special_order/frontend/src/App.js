// import logo from './logo.svg';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
// import Nav from './components/Specialorder/Nav/Nav';
import Home from './components/Specialorder/Home/Home';
import Addorder from './components/Specialorder/Addorder/Addorder';
import Orderdetails from './components/Specialorder/Orderdetails/Orders';
import Updateorder from './components/Specialorder/Updateorder/Updateorder';
import AddPayment from './components/Specialorder/PaymentProcess/AddPayment';
import PaymentSuccess from './components/Specialorder/PaymentProcess/Paymentsuccessful';
import SpecialOrderDis from './components/Admin/Specialorder/Orderdetail/SpecialOrderdis';
import DriverNot from './components/Driver/Notifications/Notifications';
import './App.css';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addspecialorder" element={<Addorder/>}/>
          <Route path="/specialorderdetails" element={<Orderdetails/>} />
          <Route path="/specialorderdetails/:id" element={<Updateorder/>}/>
          <Route path="/specialpayment" element={<AddPayment/>}/>
          <Route path="/specialpaymentsuc" element={<PaymentSuccess/>}/>
          <Route path="/specialorderdisadmin" element={<SpecialOrderDis/>}/>
          <Route path="/drivernot" element={<DriverNot/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
