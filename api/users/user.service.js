const pool = require("../../config/database");

module.exports = {
    create : (data, callback) => {
        pool.query(`insert into users (first_name, last_name, email, phone, password) values (?,?,?,?,?)`, [
            data.first_name,
            data.last_name,
            data.email,
            data.phone,
            data.password
        ], (err, result)=>{
            callback(err, result)
        });
    },
    getUsers : callback => {
        pool.query(`select id, first_name, last_name, email, phone from users`, (err, result) =>{
            return callback(err, result)
        })
    },
    getUserByID : (id, callback) => {
        pool.query(`select id, first_name, last_name, email, phone from users where id = ?`, [
            id
        ], (err, result) =>{
            return callback(err, result[0])
        })
    },
    update : (data, callback) => {
        pool.query(`update users set first_name = ?, last_name = ?, email = ?, phone = ?, password = ? where id = ?`, [
            data.first_name,
            data.last_name,
            data.email,
            data.phone,
            data.password,
            data.id
        ], (err, result) =>{
            return callback(err, result)
        })
    },
    deleteUser : (id, callback) => {
        pool.query(`delete from registration where id = ?`, [
            id
        ], (err, result) =>{
            return callback(err, result)
        })
    }

}