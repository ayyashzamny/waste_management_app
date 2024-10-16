const Order=require('../Models/Specialordermodel');

//displaying all order
const getAllOrders=async(req,res,next)=>
    {
        let Orders
    
        //get all orders
        try{
            Orders=await Order.find();//finding every note and displaying
        }catch(err){
            console.log(err);
        }
    
        //not found
        if(!Orders){
            return res.Status(404).json({message:"orders not found"});
        }
    
        //display all orders
        return res.status(200).json({Orders});
    };
    //http://localhost:5000/orders=>testing above get method using this url in the postman
    
//inserting orders
const addOrders=async(req,res,next)=>{
    const{contactname,typeofuser,contactemail,address,listofitems,prefereddate,preferedtime,totalweight,totalamount}=req.body;

    let orders;
   
    try{
        orders=new Order({contactname,typeofuser,contactemail,address,listofitems,prefereddate,preferedtime,totalweight,totalamount});
        await orders.save();//save the inserted details in the database
    }catch(err){
        console.log(err);
    }

    //not insert orders
    if(!orders){
        return res.status(404).json({message:"unable to add orders"});
    }
    return res.status(200).json({orders});

}
//http://localhost:5000/orders=>testing above post method using this url in the postman

//get by ID
const getById=async(req,res,next)=>{
    const id=req.params.id;//finding the particular order

    let order;

    try{
        order=await Order.findById(id);
    }catch(err){
        console.log(err);
    }
    //not available orders
    if(!order){
        return res.status(404).json({message:"Order not found"});
    }
    return res.status(200).json({order});

}
//http://localhost:5000/orders/id=>testing above get method using this url in the postman

//update order details
const updateOrder=async(req,res,next)=>{
    const id=req.params.id;
    const {contactname,typeofuser,contactemail,address,listofitems,prefereddate,preferedtime,totalweight,totalamount}=req.body;

    let orders;

    try{
        orders=await Order.findByIdAndUpdate(id,{contactname:contactname,typeofuser:typeofuser,contactemail:contactemail,address:address,listofitems:listofitems,prefereddate:prefereddate,preferedtime:preferedtime,totalweight:totalweight,totalamount:totalamount});//finding the particular Order and updating
        orders=await orders.save();//save the particular updated details
    }catch(err){
        console.log(err);
    }

    //not available orders
    if(!orders){
        return res.status(404).json({message:"unable to update order details"});
    }
    return res.status(200).json({orders});

}
//http://localhost:5000/orders/update/id=>test this using put method

//delete order details
const deleteOrder=async(req,res,next)=>{
    const id=req.params.id;

    let order;

    try{
        order=await Order.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!order){
        return res.status(404).json({message:"unable to update order details"});
    }
    return res.status(200).json({order});
}
//http://localhost:5000/orders/delete/id=>test this using delete method


  

//exporting all functions
exports.getAllOrders=getAllOrders;
exports.addOrders=addOrders;
exports.getById=getById;
exports.updateOrder=updateOrder;
exports.deleteOrder=deleteOrder;
