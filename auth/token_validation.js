const {verify} = require("jsonwebtoken")

module.exports  = {
    checkToken :(req, res, next) => {
        var token = req.get("authorization");

        if(!token){
            return res.json({status : false, message : "Access denied, unauthorized user"});
        }

        token = token.slice(7)

        verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err){
                return res.json({status : false, message : "Invalid bearer token"});
            }

            next();
        });
    }
}