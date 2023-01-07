const express = require("express");
const {
  getUsersFromDatabase,
  getUserFromDatabaseById,
  updateUserFromDatabaseById,
} = require("../../handle/user");
const router = express.Router();

router.get("/", async (req, res) => {
  // get a list of users and return it as a JSON response
  const users = await getUsersFromDatabase();
  res.json(users);
});

router.get("/me", async (req, res) => {
  // get the currently logged in user and return it as a JSON response (req.user is set by the JWT middleware)
  const tokenPayload = req.tokenPayload;
  try {
    const user = await getUserFromDatabaseById(tokenPayload.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  // get a single user by their ID and return it as a JSON response
  try {
    const user = await getUserFromDatabaseById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  // update a single user by their ID and return it as a JSON response
  try {
    const user = await updateUserFromDatabaseById(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
