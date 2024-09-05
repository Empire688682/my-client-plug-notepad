import jwt from "jsonwebtoken";

export const getToken = async (req) => {
  try {
    const token = req.cookies.get("MWtoken")?.value || "";
    if (!token) {
      console.log("No token provided");
      return null;  // Explicitly return null if no token is found
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    return decodedToken.id; // Assuming the token contains a user ID

  } catch (error) {
    console.log("TOKEN ERROR:", error.message);
    return null;  // Explicitly return null if token verification fails
  }
};