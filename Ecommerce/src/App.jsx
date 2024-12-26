import { Home } from "./pages/Home";
import { createContext, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import  hoodie  from "./assets/hoodie.jpg";
import  jeans  from "./assets/jeans.jpg";
import  rneck  from "./assets/roundneck.jpg";
import  shirt  from "./assets/shirt.jpg";
import  sleeves  from "./assets/sleeves.jpg";
import  tshirt  from "./assets/tshirts.jpg";
import  trousers  from "./assets/trousers.jpg";
import  vneck  from "./assets/vneck.jpg";

export const UserContext = createContext();
  const productList = [
    {
      id: 1,
      img: shirt,
      name: "Shirt",
      category: "men",
      price: 25.99,
    },
    {
      id: 2,
      img: sleeves,
      name: "Sleeves",
      category: "men",
      price: 18.99,
    },
    {
      id: 3,
      img: trousers,
      name: "Trousers",
      category: "kids",
      price: 15.49,
    },
    {
      id: 4,
      img: jeans,
      name: "Jeans",
      category: "women",
      price: 30.99,
    },
    {
      id: 5,
      img: tshirt,
      name: "T-shirt",
      category: "kids",
      price: 12.99,
    },
    {
      id: 6,
      img: rneck,
      name: "R-Neck",
      category: "men",
      price: 20.99,
    },
    {
      id: 7,
      img: vneck,
      name: "V-neck",
      category: "men",
      price: 22.49,
    },
    {
      id: 8,
      img: hoodie,
      name: "Hoodie",
      category: "women",
      price: 35.99,
    },
  ];

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [category, setCategory] = useState("all");
  const [cartVisible, setCartVisible] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const [cartItems, setCartItems] = useState(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []);
  const [FavouritesVisible, setFavouritesVisible] = useState(false);
  const [Favourites, setFavourites] = useState(localStorage.getItem("Favourites") ? JSON.parse(localStorage.getItem("Favourites")) : []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userLogged, setUserLogged] = useState(localStorage.getItem("user") || false);
  const [uniqueId, setUniqueId] = useState(localStorage.getItem("uniqueId") || "");

  return (
    <>
      <UserContext.Provider
        value={{
          searchValue,
          setSearchValue,
          filteredProducts,
          setFilteredProducts,
          productList,
          category,
          setCategory,
          cartVisible,
          setCartVisible,
          profileClicked,
          setProfileClicked,
          cartItems,
          setCartItems,
          FavouritesVisible,
          setFavouritesVisible,
          Favourites,
          setFavourites,
          email,
          setEmail,
          password,
          setPassword,
          error,
          setError,
          userLogged,
          setUserLogged,
          uniqueId,
          setUniqueId,
        }}
      >
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
