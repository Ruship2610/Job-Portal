import Job from "../Models/job.model.js";
import Application from "../Models/application.model.js";

export const applyJob = async (req,res) => {
    try {

        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message : "jobid is required",
                success : false,
            })
        };

        const existapplication = await Application.findOne({job:jobId,applicant : userId});

        if(existapplication){
            return res.status(400).json({
                message : "You have already applied for this jobs",
                success : false
            })
        };

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(400).json({
                message : "Job not found",
                success : false
            })
        };

        const application = await Application.create({
            job: jobId,
            applicant : userId,
        });

        job.applications.push(application._id);

        await job.save();
        return res.status(201).json({
            message : "Job applied successfully",
            success : true,
        });

    } catch (error) {
        console.log(error);
    };
};

export const appliedJobs = async(req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });

        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getApplicants = async(req,res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path : "applications",
            options : {sprt: {createdAt : -1}},
            populate : {
                path : "applicant",
            },
        });

        if(!job){
            return res.status(400).json({
                message:"job not found",
                success : false,
            })
        };

        return res.status(200).json({
            job,
            success: true,
        });


    } catch (error) {
        console.log(error);
    }
};

export const updateStatus = async (req,res) => {
    try {
        const {Status} = req.body;
        const appllicationId = req.params.id;

        if(!Status){
            return res.status(400).json({
                message : "Enter the status",
                success : false,
            })
        };

        const application = await Application.findOne({_id : appllicationId});

        if(!application){
            return res.status(400).json({
                message : "Appllication not found",
                success : false
            })
        };

        application.status = Status.toLowerCase();

        await application.save();

        return res.status(200).json({
            message : "Status updated successfully",
            success : true,
        });
        
    }catch(error){
        console.log(error);
    }
}