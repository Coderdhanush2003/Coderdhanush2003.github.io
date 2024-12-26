const express = require("express");
const router = express.Router();

const UserData = require("../model/userData");

router.post("/addtofavourite", async (req, res) => {
    const { uniqueId, Favourites } = req.body; // Changed 'favourite' to 'Favourites'
    if (!uniqueId || !Favourites) {
      return res.status(400).json({ message: "Invalid data" });
    }
    try {
      const user = await UserData.findOne({ uid: uniqueId });
      if (user) {
        user.favourites = Favourites; // Changed 'cart' to 'favourites'
        await user.save();
        res.json({ message: "Added to favourites" }); // Changed message
      } else {
        const newUser = new UserData({
          uid: uniqueId,
          favourites: Favourites,
        });
        await newUser.save();
        res.json({ message: "Added to favourites" }); // Changed message
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
  router.get("/getfavourite/:uniqueId", async (req, res) => {
    const { uniqueId } = req.params;
    if (!uniqueId) {
      return res.status(400).json({ message: "Invalid uniqueId" });
    }
    try {
      const user = await UserData.findOne({ uid: uniqueId });
      if (user) {
        res.json(user.favourites);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


module.exports = router;