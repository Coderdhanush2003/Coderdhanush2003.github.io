const express = require("express");
const router = express.Router();

const UserData = require("../model/userData");

router.post("/addtocart", async (req, res) => {
    const { uniqueId, cartItems } = req.body;
    if (!uniqueId || !cartItems) {
      return res.status(400).json({ message: "Invalid data" });
    }
    try {
      const user = await UserData.findOne({ uid: uniqueId });
      if (user) {
        user.cart = cartItems;
        await user.save();
        res.json({ message: "Added to cart" });
      } else {
        const newUser = new UserData({
          uid: uniqueId,
          cart: cartItems,
        });
        await newUser.save();
        res.json({ message: "Added to cart" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get("/getcart/:uniqueId", async (req, res) => {
    const { uniqueId } = req.params;
    if (!uniqueId) {
      return res.status(400).json({ message: "Invalid uniqueId" });
    }
    try {
      const user = await UserData.findOne({ uid: uniqueId });
      if (user) {
        res.json(user.cart);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


module.exports = router;