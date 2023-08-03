import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Get user from localStorage

// let userData: AuthResponse | undefined;

// if (typeof window !== "undefined") {
//   // Perform localStorage action
//   userData = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user")!)
//     : undefined;
// }

type InitialState = {
  contactInfo?: User["contact_information"];
  orderInfo?: OrderInfo;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: InitialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const ecomerceSlice = createSlice({
  name: "ecomerce",
  initialState,
  reducers: {
    setContactInfo: (
      state,
      action: PayloadAction<User["contact_information"]>
    ) => {
      state.contactInfo = action.payload;
    },
    setOrderInfo: (state, action: PayloadAction<OrderInfo>) => {
      state.orderInfo = action.payload;
    },
  },
});

export const { setContactInfo } = ecomerceSlice.actions;
export default ecomerceSlice.reducer;
