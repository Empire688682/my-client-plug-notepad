import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

// Function to get user token from cookies
export const getUserToken = () => {
    try {
        // Fetch token from cookies
        const token = Cookies.get('token') || '';  // Use js-cookie to fetch token from cookies

        if (!token) {
            throw new Error("Token not found");
        }

        // Decode the token using jwt
        const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_KEY); // Use a public env variable for client-side
        return decodedToken.userId;
    } catch (error) {
        console.log("getUserToken", error);
        return { success: false, message: "ERROR" };
    }
};
