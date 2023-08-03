import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";
import { calculateAmount } from "~/utilities/ecomerce-helpers";

const savedCartItems = Cookies.get("cart");

export interface CartState {
  amount?: number;
  total: number;
  cartItems: ProductItem[];
  loading: boolean;
  error: boolean;
}

const initialState: CartState = {
  cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
  total: 0,
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    saveToCartStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    saveToCartSuccess: (state, action: PayloadAction<ProductItem>) => {
      const newItem = action.payload;
      if (newItem.cId) {
        const existItem = state.cartItems.find(
          (item) => item.cId === newItem.cId
        );
        state.cartItems = existItem
          ? state.cartItems.map((item) =>
              item.cId === existItem.cId ? newItem : item
            )
          : [newItem, ...state.cartItems];
      }
      Cookies.set("cart", JSON.stringify(state.cartItems));
      state.amount = calculateAmount(state.cartItems);
      state.total = state.cartItems
        ? state.cartItems
            .map((item) => item.quantity)
            .reduce((total, quantity) => total + quantity, 0)
        : 0;
      state.loading = false;
      state.error = false;
    },
    saveToCartFailure: (state) => {
      state.error = true;
    },
    removeCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      const cartItems = state.cartItems.filter(
        (item) => item.cId !== action.payload
      );
      state.cartItems = cartItems;
      Cookies.set("cart", JSON.stringify(cartItems));
      state.amount = calculateAmount(state.cartItems);
      state.total = state.cartItems
        ? state.cartItems
            .map((item) => item.quantity)
            .reduce((total, quantity) => total + quantity, 0)
        : 0;

      state.loading = false;
    },
    clearCart: (state,) => {
      state.loading = true;
      state.cartItems = []
      Cookies.remove("cart")
      state.amount = undefined
      state.total = 0
      state.loading = false;
    },
  },
});

const { saveToCartStart, saveToCartSuccess, saveToCartFailure, removeCart,clearCart } =
  cartSlice.actions;

export const addToCart = (dispatch: AppDispatch, cartItem: ProductItem) => {
  if (!cartItem) {
    dispatch(saveToCartFailure());
  } else {
    dispatch(saveToCartStart());
    dispatch(saveToCartSuccess(cartItem));
  }
};

export const removeCartItem = (dispatch: AppDispatch, cId: string) => {
  dispatch(removeCart(cId));
};

export const clearCartItems = (dispatch: AppDispatch) => {
  dispatch(clearCart());
};

export default cartSlice.reducer;
