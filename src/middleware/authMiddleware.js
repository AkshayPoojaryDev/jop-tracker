import jwt from "jsonwebtoken";

const authHeader = (req, res, next) => {
    try{
    const authHeader = req.headers.authorization;

    if(!authHeader){

        return res.status(401).json({

            error:"no token"
        });
    }
    //bearter token
    const token = authHeader.split(" ")[1];
    //verify token
    const decoded= jwt.verify(token, process.env.JWT_SECRET);
    //attach user to request
    req.user = decoded;
    next();
    }catch(error){
        return res.status(401).json({
            error:"invalid token"
        });
}

    
};
export default authMiddleware;