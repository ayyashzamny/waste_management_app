import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import './Note.css';
import './Order.css';

function Order(props) {
    const{_id,contactname,typeofuser,contactemail,address,listofitems,prefereddate,preferedtime,totalweight,totalamount}=props.order;

    //implementing the delete function below delete handler
    const history=useNavigate();
    
    const deleteHandler=async()=>{
     const userconfirm=window.confirm("Are you sure you want to delete this order?")
     if(userconfirm){
      try{
      await axios.delete(`http://localhost:5000/orders/${_id}`)
      .then(res=>res.data)
      .then(()=>history("/"))
      .then(()=>history("/orderdetails"))
      }catch(error){
      console.log("Error in note deleting:",error);
      };
    }
      
    }
  return (
    <div style={{alignItems:'center'}}>
        {/* <br></br>
      <h1 className='u1'>Note Display</h1>
      
      <h2>ID:{_id}</h2>
      <h2>Name:{name}</h2>
      <h2>Note:{note}</h2>
      <h2>Grammer:{grammer}</h2>
      <h2>Complex Sentence:{complexsentence}</h2>
      <h2>Description:{description}</h2>
      <button className='bt'>
      <Link to={`/notedetails/${_id}`} className='bt1'>Update</Link>
      </button>
      <button>Delete</button>
      <br></br><br></br> */}
      {/* <button className='bt'>
      <Link to={`/userdetails/${_id}`} className='bt1'>Update</Link>
      </button>
      <button onClick={deleteHandler} className='bt'>Delete</button> */}
      
   


 <div class="card mb-3" id='cards' >
  {/* <img src="..." class="card-img-top" alt="..."> */}
  <div class="card-body" >
    <h5 class="card-title" >Order Display</h5>
    <div style={{display:'flex'}} className='details'>
    <h5>{prefereddate}</h5>
    <h5>{contactname}</h5>
      <h5>{typeofuser}</h5>
      <h5>{contactemail}</h5>
      <h5>{address}</h5>
      <h5>{listofitems}</h5>
      
      <h5>{preferedtime}</h5>
      <h5>{totalweight}</h5>
      <h5>{totalamount}</h5>
      <button
          className="btn btn-success no-print"
          // id='editbtn'
          onClick={() => (window.location.href = `/specialorderdetails/${_id}`)}
        >
          Edit
          </button>
      </div> 
  </div>
</div>

    </div>
   
  );
}

export default Order;
