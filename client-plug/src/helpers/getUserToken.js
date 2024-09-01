import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';


export const getToken = async (req) =>{
    try { 
        const token = req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        return decodedToken.id
    } catch (error) {
        console.log("TOKEN ERROR:", error);
    }
}