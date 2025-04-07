const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        console.log("Cookies:", req.cookies);
        
        const token = req.cookies?.token;
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err.message);
                return res.status(401).json({
                    message: "Invalid or expired token, please login again",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded?._id;
            next();
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
