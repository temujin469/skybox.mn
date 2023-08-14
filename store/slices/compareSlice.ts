import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const savedCompareItems = Cookies.get("compare");

export interface CompareState {
  compareItems: ProductItem[];
  loading: boolean;
  error: boolean;
}

const initialState: CompareState = {
  compareItems: savedCompareItems ? JSON.parse(savedCompareItems) : [],
  loading: false,
  error: false,
};

const compareSlice = createSlice({
  name: "Compare",
  initialState,
  reducers: {
    saveToCompareStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    saveToCompareSuccess: (state, action: PayloadAction<ProductItem>) => {
      const newItem = action.payload;

      if (newItem.cId) {
        const existItem = state.compareItems.find(
          (item) => item.cId === newItem.cId
        );
        state.compareItems = existItem
          ? state.compareItems.map((item) =>
              item.cId === existItem.cId ? newItem : item
            )
          : [newItem, ...state.compareItems];
      }

      Cookies.set("compare", JSON.stringify(state.compareItems));

      state.loading = false;
      state.error = false;
    },
    saveToCompareFailure: (state) => {
      state.error = true;
    },
    removeCompare: (state, action: PayloadAction<string>) => {
      state.loading = true;
      const compareItems = state.compareItems.filter(
        (item) => item.cId !== action.payload
      );
      state.compareItems = compareItems;
      Cookies.set("compare", JSON.stringify(compareItems));

      state.loading = false;
    },
  },
});

const {
  saveToCompareStart,
  saveToCompareSuccess,
  saveToCompareFailure,
  removeCompare,
} = compareSlice.actions;

export const addToCompare = (dispatch: AppDispatch, item: ProductItem) => {
  if (!item) {
    dispatch(saveToCompareFailure());
  } else {
    dispatch(saveToCompareStart());
    dispatch(saveToCompareSuccess(item));
  }
};

export const removeCompareItem = (dispatch: AppDispatch, cId: string) => {
  dispatch(removeCompare(cId));
};

export default compareSlice.reducer;
