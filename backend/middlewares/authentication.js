import jwt from "jsonwebtoken";

export const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(400).json({
                message: "user is not authenticated",
                success : false,
            });
        };

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if(!decode){
            return res.status(400).json({message:"Invalid token",success:false,})
        };
        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;