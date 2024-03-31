const mongoose = require("mongoose");

const conn = () =>{
    return mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("Connection Successfully");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = conn;