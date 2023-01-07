const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { create, getUserByID, getUsers, update, deleteUser, getUserByEmail} = require("./user.service");
const {sign } = require("jsonwebtoken");

module.exports = {
    createUser : (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        console.log(body.password)
        body.password = hashSync(body.password, salt)
        console.log(body.password)
        create(body, (err, result)=>{
            if(err){
                return res.status(500).json({
                    status : false,
                    message : "Database Connection Error"
                })
            }

            return res.status(200).json({
                status : true,
                data : result,
            })
        });
    },
    getAll : (req, res) => {
        getUsers((err, result) => {
            if(err){
                return res.json({
                    status : false,
                    message : err,
                })
            }

            return res.json({
                status : true,
                data : result
            })
        })
    },
    getUser : (req, res) => {
        const id = req.params.id;
        getUserByID(id, (err, result) => {
            if(err){
                return res.json({
                    status : false,
                    message : err,
                })
            }

            return res.json({
                status : true,
                data : result
            })
        })
    },
    updateUser : (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        update(body, (err, result)=>{
            if(err){
                return res.status(500).json({
                    status : false,
                    message : "Database Connection Error"
                })
            }
            if(!result){
                return res.status(500).json({
                    status : false,
                    message : "failed to update user"
                })
            }
            return res.status(200).json({
                status : true,
                data : "user updated successfully",
            })
        });
    },
    deleteUser : (req, res) => {
        const id = req.body.id;
        deleteUser(id, (err, result) => {
            if(err){
                return res.json({
                    status : false,
                    message : err,
                })
            }

            return res.json({
                status : true,
                data : result
            })
        })
    },
    login : (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, result)=>{
            if(err){
                return res.json({
                    status : false,
                    message : "database connection error"
                })
            }
            if(!result){
                return res.json({
                    status : false,
                    message : "Invalid login credentials"
                })
            }

            const checkPassword = compareSync(body.password, result.password);
            if(checkPassword){
                result.password = undefined;
                // sign the user
                const jsonwebtoken = sign({result : result}, process.env.JWT_KEY, {
                    expiresIn : "1hr"
                });
                return res.json({status : true, message : "login successfully", token : jsonwebtoken})
            }

            return res.json({
                status : false,
                message : "Invalid login credentials"
            })
        })
    }
}