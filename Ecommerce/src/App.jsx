import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import product images
import hoodie from "./assets/hoodie.jpg";
import jeans from "./assets/jeans.jpg";
import rneck from "./assets/roundneck.jpg";
import shirt from "./assets/shirt.jpg";
import sleeves from "./assets/sleeves.jpg";
import tshirt from "./assets/tshirts.jpg";
import trousers from "./assets/trousers.jpg";
import vneck from "./assets/vneck.jpg";

export const UserContext = createContext();

// Define product list
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
  const [cartItems, setCartItems] = useState([]);
  const [FavouritesVisible, setFavouritesVisible] = useState(false);
  const [Favourites, setFavourites] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userLogged, setUserLogged] = useState(false);
  const [uniqueId, setUniqueId] = useState("");

  // Load user data when uniqueId changes
  useEffect(() => {
    if (uniqueId) {
      fetchUserData(uniqueId);
    }
  }, [uniqueId]);

  const fetchUserData = async (userId) => {
    try {
      // Fetch cart items
      const cartResponse = await fetch(`https://ecommerce-fullstack-r9n1.onrender.com/getcart/${userId}`);
      const cartData = await cartResponse.json();
      if (cartData) {
        setCartItems(cartData);
      }

      // Fetch favorites
      const favResponse = await fetch(`https://ecommerce-fullstack-r9n1.onrender.com/getfavourite/${userId}`);
      const favData = await favResponse.json();
      if (favData) {
        setFavourites(favData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    setUserLogged(false);
    setCartItems([]);
    setFavourites([]);
    setUniqueId("");
    setEmail("");
    setPassword("");
    localStorage.clear();
  };

  return (
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
        handleLogout
      }}
    >
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route 
            path="/" 
            element={userLogged ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!userLogged ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!userLogged ? <Signup /> : <Navigate to="/" />} 
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
