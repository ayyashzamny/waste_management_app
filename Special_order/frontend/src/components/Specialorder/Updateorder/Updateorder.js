import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from '../Nav/Nav';
// import bgImage from "./update.jpeg";

function Updateorder() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/orders/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.order));
    };
    fetchHandler();
  },[id]);

   //implementing the delete function below delete handler
//  const history=useNavigate();
    
   const deleteHandler=async()=>{
    const userconfirm=window.confirm("Are you sure you want to delete this order?")
    if(userconfirm){
     try{
     await axios.delete(`http://localhost:5000/orders/${id}`)
     .then(res=>res.data)
     .then(()=>history("/"))
     .then(()=>history("/orderdetails"))
     }catch(error){
     console.log("Error in note deleting:",error);
     };
   }
     
   }
  

  //implementing the sendrequest function
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/orders/${id}`, {
        //module attribute name= form input.name
         //module attribute name=name
      contactname:String(inputs.contactname),
      contactnumber:String(inputs.contactnumber),
      contactemail:String(inputs.contactemail),
      address:String(inputs.address),
      listofitems:String(inputs.listofitems),
      prefereddate:String(inputs.prefereddate),
      preferedtime:String(inputs.preferedtime),
      })
      .then((res) => res.data);
  };

  //implementing a function what should happen when make inputs and submit
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

   //after where should navigate,url related function
   const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('/orderdetails'),alert("Order details updated successfully!"));
   };

  return (
    <div>
       <Nav/>
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
  <div style={{display:'flex'}}>
  <button type="submit" class="btn btn-danger" onClick={deleteHandler}>Delete</button>
  <button type="submit" class="btn btn-success" style={{marginLeft:'550px'}}>Update</button>
  </div>
</form>
</div>
    </div>
  );
}

export default Updateorder;
