// const jwt = require("jsonwebtoken")

// function verifyTokens(req, res, next){
//     const token = req.cookies.token 

//     if(!token) return res.status(401).json({message: "Not Authenticated"});

//     try{
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decode
//         next();
//     }catch(error){
//          return res.status(403).json({ message: "Invalid token" });
//     }
// }

// module.exports = verifyTokens;