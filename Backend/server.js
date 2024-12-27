const express = require("express");
const app = express();
const path = require('path');

const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");
const URI = process.env.MONGO_URL;


const cors = require("cors");

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


const user = require("./routes/user");
const cart = require("./routes/cart");
const favourite = require("./routes/Favourite");

PORT = process.env.PORT || 2500;

app.use(
  cors({
    origin: "https://ecommerce-frontend-gvkl.onrender.com",
  })
);

app.use(express.json());

app.use("/", user);
app.use("/", cart);
app.use("/", favourite);


async function start() {
  try {
    if (
      await mongoose.connect(URI)
    ) {
      app.listen(PORT, () => {
        console.log("Database Connected Successfully");
        console.log("Server is Running");
      });
    }
  } catch (error) {
    console.log(error);
  }
}
start();
