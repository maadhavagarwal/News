const JWT_SECRET = "guvilearningportal$1567";
const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('auth-token');

    // If token is not present, return error
    if (!token) {
        return res.status(401).send({ error: "Please Authenticate" });
    }

    try {
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);

        // Log the decoded token for debugging
        //console.log("Decoded Token:", decoded);

        // Attach the user object from the decoded token to the request
        req.user = decoded;
          console.log(decoded)
        // Call the next middleware
        next();
    } catch (error) {
        // Log the error for debugging
        console.error("Token Verification Error:", error);

        // If token verification fails, return error
        res.status(401).send({ error: "Please Authenticate" });
    }
}

module.exports = fetchuser;
