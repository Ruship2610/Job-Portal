import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Company",
        required : true,
    },
    applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    status : {
        type: String,
        enum : ["pending","accepted","rejected"],
        required : true,
        default : "pending",
    },
},{timestamps:true});

const Apllication = new mongoose.model("Application",applicationSchema);

export default Apllication;