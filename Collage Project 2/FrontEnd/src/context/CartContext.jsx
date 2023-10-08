import { createContext, useContext, useState } from "react";

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export const ContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <CartContext.Provider
      value={{
        setCartProducts,
        cartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
