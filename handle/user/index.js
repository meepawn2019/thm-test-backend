const CustomError = require("../../errors");
const User = require("../../model/user");
const sequelize = require("../../sequelize");

const getUsersFromDatabase = async () => {
  // get users from database using sequelize
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "country",
        "city",
        "phone_number",
        "position",
        "created_at",
        "updated_at",
      ],
    });
    // get user data from the first row
    return users.map((user) => user.dataValues);
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

const getUserFromDatabaseById = async (id) => {
  // get a single user from database using sequelize
  try {
    const user = await User.findOne({
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "country",
        "city",
        "phone_number",
        "position",
        "created_at",
        "updated_at",
      ],
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new CustomError("user not found", 400);
    }
    // get user data from the first row

    return user.dataValues;
  } catch (error) {
    throw error;
  }
};

const createNewUser = async (user) => {
  // create a new user in the database using sequelize
  const newUser = await sequelize.query(
    "INSERT INTO users (email, password, first_name, last_name, country, city, phone_number, position) VALUES ($email, $password, $first_name, $last_name, $country, $city, $phone_number, $position)",
    {
      bind: {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
        city: user.city,
        phone_number: user.phone_number,
        position: user.position,
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );
  return newUser;
};

const updateUserFromDatabaseById = async (id, user) => {
  try {
    // update a user in the database using sequelize
    let currentUser = await getUserFromDatabaseById(id);
    // update the user data
    currentUser = {
      ...currentUser,
      ...user,
    };
    const updatedUser = await User.update(
      { ...currentUser, updated_at: new Date() },
      {
        where: {
          id,
        },
        returning: [
          "id",
          "email",
          "first_name",
          "last_name",
          "country",
          "city",
          "phone_number",
          "position",
          "created_at",
          "updated_at",
        ],
      }
    );
    return updatedUser[1][0].dataValues;
  } catch (error) {
    throw error;
  }
};

const getUserLoginFromDatabase = async (email) => {
  // get a single user from database using sequelize
  try {
    const user = await User.findOne({
      attributes: ["id", "email", "password"],
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new CustomError("user not found", 400);
    }
    return user.dataValues;
  } catch (error) {
    throw error;
  }
};

const getUserFromDatabaseByEmail = async (email) => {
  // get a single user from database using sequelize
  try {
    const user = await User.findOne({
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "country",
        "city",
        "phone_number",
        "position",
        "created_at",
        "updated_at",
        "password",
      ],
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new CustomError("user not found", 400);
    }
    return user.dataValues;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsersFromDatabase,
  getUserFromDatabaseById,
  getUserFromDatabaseByEmail,
  updateUserFromDatabaseById,
  getUserLoginFromDatabase,
};
