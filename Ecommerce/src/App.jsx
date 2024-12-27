// App.jsx
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext();

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

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const storedId = localStorage.getItem("uniqueId");
      if (storedId) {
        try {
          const response = await fetch("https://ecommerce-fullstack-r9n1.onrender.com/verify-auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uniqueId: storedId }),
          });
          
          const data = await response.json();
          if (data.verified) {
            setUserLogged(true);
            setUniqueId(storedId);
            // Fetch user's cart and favorites
            await fetchUserData(storedId);
          } else {
            // Clear invalid auth data
            handleLogout();
          }
        } catch (error) {
          console.error("Auth verification failed:", error);
          handleLogout();
        }
      }
    };
    
    checkAuth();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      // Fetch cart items
      const cartResponse = await fetch(`https://ecommerce-fullstack-r9n1.onrender.com/getcart/${userId}`);
      const cartData = await cartResponse.json();
      setCartItems(cartData || []);

      // Fetch favorites
      const favResponse = await fetch(`https://ecommerce-fullstack-r9n1.onrender.com/getfavourite/${userId}`);
      const favData = await favResponse.json();
      setFavourites(favData || []);
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
        searchValue, setSearchValue,
        filteredProducts, setFilteredProducts,
        productList, category, setCategory,
        cartVisible, setCartVisible,
        profileClicked, setProfileClicked,
        cartItems, setCartItems,
        FavouritesVisible, setFavouritesVisible,
        Favourites, setFavourites,
        email, setEmail,
        password, setPassword,
        error, setError,
        userLogged, setUserLogged,
        uniqueId, setUniqueId,
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