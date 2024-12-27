import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    searchValue,
    setSearchValue,
    category,
    setCategory,
    profileClicked,
    setProfileClicked,
    CartVisible,
    setCartVisible,
    cartItems,
    setCartItems,
    FavouritesVisible,
    setFavouritesVisible,
    Favourites,
    setFavourites,
    userLogged,
    setUserLogged,
  } = useContext(UserContext);

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  function getValue(e) {
    setSearchValue(e.target.value);
    setCategory("");
  }

  function handleLogout() {
    setUserLogged(false);
    setCartItems([]); // Clear cart items on logout
    setFavourites([]); // Clear favorites on logout
    localStorage.removeItem("user");
    localStorage.removeItem("uniqueId");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("Favourites");
  }
  

  useEffect(() => {
    // Ensure that cartItems are persisted to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="flex bg-white justify-between items-center border mb-2 md:gap-8 p-4 sticky top-0 z-10">
      <h1
        className="text-lg font-bold cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        E-Com
      </h1>

      {/* Conditionally render search input */}
      {userLogged && !isLoginPage && !isSignupPage && (
        <div className="relative md:w-2/3">
          <input
            name="search"
            type="text"
            className="border w-full outline-none rounded-full px-4 py-2 pl-10"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => getValue(e)}
          />
          <p className="absolute right-0 mr-6 top-1/2 transform -translate-y-1/2 text-gray-500">
            &#128269;
          </p>
        </div>
      )}

      {/* Render either the login/signup button or profile/cart button based on user's login state */}
      {userLogged ? (
        <div className="flex items-center gap-6">
          <div className="relative">
            <p
              className="text-2xl cursor-pointer"
              onClick={() => {
                if (FavouritesVisible) {
                  setFavouritesVisible((prevState) => !prevState);
                }
                setCartVisible((prevState) => !prevState);
              }}
            >
              &#128722;
            </p>
            <div className="w-4 h-4 rounded-full bg-red-300 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <p className="text-xs font-bold text-white">{cartItems.length}</p>
            </div>
          </div>

          <div
            className="relative w-8 h-8 rounded-full bg-red-300 text-center flex items-center justify-center font-bold text-white cursor-pointer"
            onClick={() => setProfileClicked(!profileClicked)}
          >
            DS
          </div>
          {profileClicked && (
            <div className="absolute top-100 w-44 text-center bg-white right-0 mt-1 drop-shadow-lg rounded-lg">
              <p
                className="hover:bg-gray-100 p-2 cursor-pointer font-medium"
                onClick={() => {
                  setFavouritesVisible((prevState) => !prevState);
                  setProfileClicked((prevState) => !prevState);
                }}
              >
                Favourites
              </p>
              <hr className="w-full text-center" />
              <p className="hover:bg-gray-100 p-2 cursor-pointer font-medium" onClick={() => handleLogout()}>
                Logout
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Show Sign Up button on Login page, and Login button on Sign Up page */}
          {!userLogged && (
            <button
              className="border px-6 py-2 rounded-md font-semibold"
              onClick={() => navigate(isLoginPage ? "/signup" : "/login")}
            >
              {isLoginPage ? "Sign Up" : "Login"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
