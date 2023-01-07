const { genSaltSync, hashSync } = require("bcrypt");
const { create, getUserByID, getUsers, update, deleteUser} = require("./user.service");

module.exports = {
    createUser : (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
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
}