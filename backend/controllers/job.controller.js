import Job from "../Models/job.model.js";

export const postJob = async(req,res) => {
    try {
        const { title,description,requirements,salary,experienceLevel,location,jobType,position,companyId} = req.body;

        const data = { title,description,requirements,salary,experienceLevel,location,jobType,position,companyId};

        const userId = req.id;

        if(!data){
            return res .status(400).json({
                message: "All fields are required",
                success : false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements,
            salary:Number(salary),
            experienceLevel:Number(experienceLevel),
            location,
            jobType,
            position,
            company: companyId,
            created_by : userId,
        });

        return res.status(201).json({
            message : "New job posted successfully",
            job,
            success : true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };

        const jobs = await Job.find(query).populate({
            path : "company"
        }).sort({createdAt : -1});

        if(!jobs){
            return res.status(400).json({
                message:"Job not found",
                success: false,
            })
        };

        return res.status(200).json({
            jobs,
            success:true,
        }) ;

        
    } catch (error) {
        console.log(error);
    }
};

export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;

        const jobs = await Job.findById(jobId);

        if(!jobs){
            return res.status(400).json({
                message:"Job does not exist",
                success:false,
            })
        };

        return res.status(200).json({
            message : "Job found",
            jobs,
            success :true
        });

    } catch (error) {
        console.log(error);   
    }
};

export const getJobByAdmin = async(req,res) => {
    try {
        const AdminId = req.id;

        const jobs = await Job.find({created_by:AdminId});

        if(!jobs){
            return res.status(400).json({
                message:"Job does not exist",
                success:false,
            })
        };
        
        return res.status(200).json({
            message : "Job found",
            jobs,
            success :true
        });

    } catch (error) {
        console.log(error);
    }
};