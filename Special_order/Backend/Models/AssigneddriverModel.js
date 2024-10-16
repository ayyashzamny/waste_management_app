const mongoose = require("mongoose");

const orderdSchema = new mongoose.Schema({
    contactname: { type: String, required: true },
    typeofuser: { type: String, required: true },
    contactemail: { type: String, required: true },
    address: { type: String, required: true },
    listofitems: { type: String, required: true },
    prefereddate: { type: Date, required: true },
    preferedtime: { type: String, required: true },
    totalweight: { type: Number, required: true },
    totalamount: { type: Number, required: true },
    assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    // Add other necessary fields
});

module.exports = mongoose.model(
    "Assigneddriver", orderdSchema
);
