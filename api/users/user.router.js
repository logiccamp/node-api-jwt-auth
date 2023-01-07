const { createUser, getAll, getUser, updateUser, deleteUser } = require("./user.controller");

const router = require("express").Router();

router.post("/", createUser)
router.get("/", getAll)
router.get("/:id", getUser)
router.patch("/", updateUser)
router.delete("/:id", deleteUser)

module.exports = router;