const express=require("express");
const router2=express.Router();

//Insert Model
const AssignedDriver=require("../Models/AssigneddriverModel");
//Insert User Controller
const AssignController=require("../Controllers/Assigndrivercontroller");


router2.put("/assign/:id", AssignController.assignDriver);
router2.get("/notifications/:driverId", AssignController.getDriverNotifications);
router2.put("/accept/:id", AssignController.acceptOrder);
router2.put("/deny/:id", AssignController.denyOrder);

module.exports=router2