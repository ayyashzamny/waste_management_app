import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import './Addorder.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import bgImage from "./bg2.jpeg";
import Bin from './bin.png';

function Addorder() {
  //user inputs note details and setting the inputs
  const history=useNavigate();
  const [inputs,setInputs]=useState({
    //below name should same as name input name in the form
    contactname:"",
    contactnumber:"",
    contactemail:"",
    address:"",
    listofitems:"",
    prefereddate:"",
    preferedtime:"",
  });
  //implementing a function what should happen when make inputs and submit
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  };

  //after where should navigate,url related function
  const handleSubmit=(e)=>{
    // e represents the event object, and e.preventDefault(); is a method that prevents the default action of the event.
    // In the context of form submission, the default action is to reload the page. By calling preventDefault(), you prevent this reload and handle the submission in a custom way (e.g., via JavaScript/React).
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('/orderdetails'),alert("Orders added successfully!"));
  }

  //implementing the sendrequest function from above
  const sendRequest=async()=>{
    await axios.post("http://localhost:5000/orders",{
      //module attribute name=name
      contactname:String(inputs.contactname),
      contactnumber:String(inputs.contactnumber),
      contactemail:String(inputs.contactemail),
      address:String(inputs.address),
      listofitems:String(inputs.listofitems),
      prefereddate:String(inputs.prefereddate),
      preferedtime:String(inputs.preferedtime),
    }).then(res=>res.data);
  }
  return (
    <div>
        <Nav/>
      <div className='' style={{display:'flex',gap:'30px'}}>
       <div className="bg"
      style={{   backgroundColor: 'white',
        backgroundSize: 'cover',
        position: 'sticky',
        top:0
         }}>
      
      <form onSubmit={handleSubmit} className='form'>
        <br></br><br/><br/><br/>
      <h1>Shedule A special Waste Collection</h1>
  <div class="mb-3">
    <label for="InputName" class="form-label">Contact Name</label>
    <input type="text" class="form-control" name="contactname" aria-describedby="nameHelp" onChange={handleChange} value={inputs.contactname}/>
    <div id="namehelp" class="form-text">Please remember the name you are able to search by this keyword</div>
  </div>
  <div class="mb-3">
    <label for="InputNote" class="form-label">Contact Number</label>
    <textarea  name="contactnumber" class="form-control" onChange={handleChange} value={inputs.contactnumber} required/>
  </div>
  <div class="mb-3">
    <label for="InputGrammer" class="form-label">Contact Email</label>
    <input type="text" class="form-control" name="contactemail" onChange={handleChange} value={inputs.contactemail} required/>
  </div>
  <div class="mb-3">
    <label for="InputComplexsentence" class="form-label">Address</label>
    <input type="text" class="form-control" name="address" onChange={handleChange} value={inputs.address} required/>
  </div>
  <div class="mb-3">
    <label for="InputDescription" class="form-label">List Of Items</label>
    <input type="text" class="form-control" name="listofitems" onChange={handleChange} value={inputs.listofitems} required/>
  </div>
  {/* <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
  <div class="mb-3">
    <label for="InputDescription" class="form-label">Prefered Date</label>
    <input type="date" class="form-control" name="prefereddate" onChange={handleChange} value={inputs.prefereddate} required/>
  </div>
  <div class="mb-3">
    <label for="InputDescription" class="form-label">Prefered Time</label>
    <input type="text" class="form-control" name="preferedtime" onChange={handleChange} value={inputs.preferedtime} required/>
  </div>
  <div className='btngroup' >
  <button type="submit" class="btn btn-secondary">Cancel</button>
  <button type="submit" class="btn btn-success" style={{marginLeft:'550px'}}>Save</button>
  </div>
</form>
</div>
<div className='bin'>
        <img src={Bin} alt="logo_nav" className="binimg" /> 
</div>
    </div>
    </div>
  );
}

export default Addorder;

