// import jwt, { JwtPayload } from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";


// export const verifyToken = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;

//     // Ensure the authorization header exists and is in the correct format
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     // Extract the token
//     const token = authHeader.split(" ")[1];

//     try {
//         // Verify the token using the secret key
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

//         // Attach the decoded user info (or any other data) to the request
//         req.user = decoded;

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }
// };