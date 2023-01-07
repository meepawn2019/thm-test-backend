const jwt = require("jsonwebtoken");
const sequelize = require("../../sequelize");
const bcrypt = require("bcrypt");
const CustomError = require("../../errors");
const {
  getUserFromDatabaseByEmail,
  getUserLoginFromDatabase,
} = require("../user");

const login = async (user) => {
  try {
    const userData = await getUserLoginFromDatabase(user.email);
    const validPassword = await bcrypt.compare(
      user.password,
      userData.password
    );

    if (!validPassword) {
      throw new CustomError("password is incorrect", 400);
    }
    return generateToken({
      id: userData.id,
      email: userData.email,
    });
  } catch (error) {
    throw error;
  }
};

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const refreshToken = async () => {
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken({ name: user.name });
    return { accessToken, refreshToken: token };
  });
};

module.exports = { login, generateToken, refreshToken };
