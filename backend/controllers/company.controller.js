import Company from "../Models/company.model.js";

export const registerCompany = async(req,res) => {
    try {
        const {companyName} = req.body;

        if(!companyName){
            return res.status(400).json({
                message : "Company name is required",
                success:false,
            })
        };

        let company = await Company.findOne({name:companyName});

        if(company){
            return res.status(400).json({message:"Company already exist",
                success: false,
            })
        };

        company = await Company.create({
            name : companyName,
            userId : req.id,
        });

        return res.status(201).json({
            message : "Company registered syccessfully",
            company,
            success : true,
        });

    } catch (error) {
        console.log(error);
    }
};

export const getCompany = async(req,res) => {
    try {
       

        const data = req.id;

        const companies = await Company.find({userId : data});

        if(!companies){
            return res.status(400).json({
                message : "Company does not exist",
                success : false,
            });
        }

        return res.status(200).json({
            message  : "Company",
            companies,
            success : true,
        });
    } catch (error) {
        console.log(error);
    };
};

export const getCompanyById = async(req,res) => {
    try {

        const companyId = req.params.id;

        const companybyid = await Company.findById(companyId);

        if(!companybyid){
            return res.status(400).json({
                message : "Company does not exist",
                success : false,
            });
        };

        return res.status(200).json({
            companybyid,
            success : true,
        });

        
    } catch (error) {
        console.log(error);
    }
};

export const updateCompany = async (req,res) => {
    try {
        const{name,description,website,location,logo} = req.body;

        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            company,
            success:true
        })

        
    } catch (error) {
        console.log(error);
    };
};
