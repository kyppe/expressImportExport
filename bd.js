import mongoose, { connect } from "mongoose";

function ConnectToBd()
{
    mongoose.connect("mongodb://localhost:27017/pfeBackend");
    const db = mongoose.connection;
    db.on("error",(error)=>console.error(error))
    db.once("open",()=> console.log("data base connected"))
    return db ;
}
export default ConnectToBd; 