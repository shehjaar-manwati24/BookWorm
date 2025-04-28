//token-based auth:  The server creates a secure token that contains encrypted information abou who you are. 
// Your app stores this token and sends it with future requests to prove your identity

import jwt from "jsonwebtoken";

import User from "../models/User.js";

// const response = await fetch(`http://localhost:3001/api/books`, {
//     method:"POST",
//     body: JSON.stringify({
//         title,
//         caption
//     }),
//     headers: { Authorisation: `Bearer ${token}`},
// });

const protectRoute = async(req, resizeBy, next) => {
    try{
        
        //get token
        const token = req.header("Authorization").replace("Bearer", "");

        if(!token) return res.status(401).json({message: "No authentication token, access denied"});

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        //find user
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(401).json({ message: "Token is not vaid"});

        req.user= user;
        next();
    }catch(error){

        console.error("Authentication error:", error.message);
        res.status(401).json({ message: "Token is not valid"});

    }
}

export default protectRoute;