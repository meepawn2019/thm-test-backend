const express = require("express");
const {
  default: AuthModel,
  login,
  refreshToken,
} = require("../../handle/auth");
const { default: UserModel } = require("../../model/user");

const router = express.Router();
router.post("/login", async (req, res, next) => {
  // validate the request body using the user schema
  try {
    const resonpse = await login(req.body);
    res.json(resonpse);
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res) => {
  res.json({ message: "logout" });
});

router.post("/refresh", (req, res) => {
  try {
    const res = refreshToken(req.headers.authorization.split(" ")[1]);
    res.json(res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
