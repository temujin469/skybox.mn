import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const savedWishlistItems = Cookies.get("wishlist");

export interface WishlistState {
  wishlistItems: ProductItem[];
  loading: boolean;
  error: boolean;
}

const initialState: WishlistState = {
  wishlistItems: savedWishlistItems ? JSON.parse(savedWishlistItems) : [],
  loading: false,
  error: false,
};

const wishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    saveToWishlistStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    saveToWishlistSuccess: (state, action: PayloadAction<ProductItem>) => {
      const newItem = action.payload;

      if (newItem.cId) {
        const existItem = state.wishlistItems.find(
          (item) => item.cId === newItem.cId
        );
        state.wishlistItems = existItem
          ? state.wishlistItems.map((item) =>
              item.cId === existItem.cId ? newItem : item
            )
          : [newItem, ...state.wishlistItems];
      }

      Cookies.set("wishlist", JSON.stringify(state.wishlistItems));

      state.loading = false;
      state.error = false;
    },
    saveToWishlistFailure: (state) => {
      state.error = true;
    },
    removeWishlist: (state, action: PayloadAction<string>) => {
      state.loading = true;
      const wishlistItems = state.wishlistItems.filter(
        (item) => item.cId !== action.payload
      );
      state.wishlistItems = wishlistItems;
      Cookies.set("wishlist", JSON.stringify(wishlistItems));

      state.loading = false;
    },
  },
});

const {
  saveToWishlistStart,
  saveToWishlistSuccess,
  saveToWishlistFailure,
  removeWishlist,
} = wishlistSlice.actions;

export const addToWishlist = (dispatch: AppDispatch, item: ProductItem) => {
  if (!item) {
    dispatch(saveToWishlistFailure());
  } else {
    dispatch(saveToWishlistStart());
    dispatch(saveToWishlistSuccess(item));
  }
};

export const removeWishlistItem = (dispatch: AppDispatch, cId: string) => {
  dispatch(removeWishlist(cId));
};

export default wishlistSlice.reducer;
