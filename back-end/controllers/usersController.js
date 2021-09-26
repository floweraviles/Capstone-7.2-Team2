const express = require("express");

const artworkController = require("./artworkController");
const venuesController = require("./venuesController");

const users = express.Router();

const {
  getAllUsers,
  getUser,
  postUser,
  editUser,
  deleteUser,
} = require("../queries/users");
const { getAllVenuesForUser } = require("../queries/venues");

users.use("/:artist_id/artwork", artworkController);

users.use("/:owner_id/venues", venuesController);

users.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  res.json({ success: true, payload: allUsers });
});

users.get("/:id", async (req, res) => {
  // let res = await axios.get(`${API}/users/${id}?isVenue=${user.isVenueOwner}`);
  // req.params.id  ..... 6
  // req.query.isVenue ..... true

  // const data = await getUser(id, isVenueOwner); { user: {}, venues: [{}] }

  try {
    // const { isVenueOwner } = req.query
    const is_venue = true;
    const { id } = req.params;
    const user = await getUser(id, is_venue);

    if (user?.is_venue) {
      console.log("inside if");
      const venues = await getAllVenuesForUser(id);
      const user = await getUser(id);
      res.json({
        success: true,
        payload: { user, venues },
      });
    } else if (user?.id) {
      console.log("inside else if");
      const user = await getUser(id);
      res.json({
        success: true,
        payload: { user },
      });
    } else {
      console.log("inside the throw");
      throw user;
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, payload: "User not found", error: error });
  }
});

users.post("/", async (req, res) => {
  try {
    const newUser = await postUser(req.body);
    if (newUser) {
      res.json({ success: true, payload: newUser });
    } else {
      throw newUser;
    }
  } catch (error) {
    res.status(422).json({
      success: false,
      payload: "Must enter required field",
      error: error,
    });
  }
});

users.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await editUser(req.body, id);
    if (updatedUser["id"]) {
      res.json({ success: true, payload: updatedUser });
    } else {
      throw updatedUser;
    }
  } catch (error) {
    res
      .status(422)
      .json({ success: false, payload: "Must enter valid data", error: error });
  }

  // res.json(updatedUser);
});

users.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (deletedUser["id"]) {
      res.json({ success: true, payload: deletedUser });
    } else {
      throw deletedUser;
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, payload: "User not found", error: error });
  }
});

module.exports = users;
