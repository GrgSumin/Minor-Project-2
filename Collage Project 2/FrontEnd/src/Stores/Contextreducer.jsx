import React from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action._id,
          title: action.title,
          Brand: action.Brand,
          Price: action.Price,
          qty: action.qty,
          Image: action.Image,
        },
      ];
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={dispatch}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
export const UseCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
