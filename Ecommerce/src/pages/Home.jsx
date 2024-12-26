import React from "react";
import Slider from "../components/Slider";
import Products from "../components/Products";
import { Cart } from "../components/Cart";
import { UserContext } from "../App";
import { useContext } from "react";
import { Favourite } from "../components/Favourite";



export const Home = () => {
  const {cartVisible,setCartVisible,FavouritesVisible} = useContext(UserContext)
  return (
    <>
      <Slider />
      <Products />
      {cartVisible?<Cart/>:<></>}
      {FavouritesVisible?<Favourite/>:<></>}
    </>
  );
};
