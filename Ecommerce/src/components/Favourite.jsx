import React, { useContext, useState } from "react";
import { UserContext } from "../App";

export const Favourite = () => {
  const {
    cartItems,
    setCartItems,
    FavouritesVisible,
    setFavouritesVisible,
    Favourites,
    setFavourites,
    productList,
  } = useContext(UserContext);

  const addCart = (itemId) => {
    const item = Favourites.find((item) => item.id === itemId); // Correct item fetching from Favourites

    if (item) {
      // Check if the item is already in the cart
      const existingProduct = cartItems.find((cartItem) => cartItem.id === item.id);
      if (existingProduct) {
        setFavourites(Favourites.filter((favItem) => favItem.id !== itemId));
      } else {

        setCartItems([...cartItems, { ...item, quantity: 1 }]);
        setFavourites(Favourites.filter((favItem) => favItem.id !== itemId));
      }
      
    }
  };

  return (
    <div className="fixed top-0 left-0 bg-white w-full sm:block max-w-[400px] h-screen z-10 p-6 rounded-lg sm:rounded-lg drop-shadow-lg overflow-auto">
      <p
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          setFavouritesVisible(!FavouritesVisible);
        }}
      >
        &#x2715;
      </p>

      <h1 className="text-center font-bold text-3xl">Favourites</h1>

      {Favourites.length === 0 ? (
        <p className="text-center font-semibold text-xl mt-4">
          Your favourites is empty
        </p>
      ) : (
        Favourites.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 mt-4 rounded-lg flex items-center justify-between p-4 relative"
          >
            <p
              className="absolute top-0 left-[-4px] cursor-pointer"
              onClick={() => {
                // Remove the item from favourites
                setFavourites(Favourites.filter((favItem) => favItem.id !== item.id));
              }}
            >
              &#x2715;
            </p>
            <div className="flex items-center">
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 rounded"
              />
              <p className="ml-3 font-semibold">{item.name}</p>
            </div>

            <button
              className=" py-2 px-2 bg-red-400 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
              onClick={() => addCart(item.id)}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};
