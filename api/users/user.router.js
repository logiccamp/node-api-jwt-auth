const { checkToken } = require("../../auth/token_validation");
const { createUser, getAll, getUser, updateUser, deleteUser, login } = require("./user.controller");

const router = require("express").Router();

router.post("/", checkToken, createUser)
router.get("/",  checkToken, getAll)
router.get("/:id", checkToken, getUser)
router.patch("/", checkToken, updateUser)
router.delete("/:id", checkToken, deleteUser)
router.post("/login", login)

module.exports = router;