const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const authRouter = require("./auth");
const { expressjwt: jwt } = require("express-jwt");
const tokenHandler = require("../middleware/authorizationMiddleware");

// ad the tokenHandler middleware to the users route
// router.use("/users", tokenHandler);

router.use("/users", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
