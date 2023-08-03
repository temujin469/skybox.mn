import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage

let userData: AuthResponse | undefined;

if (typeof window !== "undefined") {
  // Perform localStorage action
  userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : undefined;
}

type InitialState = {
  user?: User
  token?: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: InitialState = {
  user: userData ? userData.user : undefined,
  token: userData ? userData.jwt : undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user:UserBody, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user:UserBody, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message:string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// signin with provided credentials
export const signinWithProvider = createAsyncThunk(
  "auth/signin",
  async (
    data: { provider: "google" | "facebook" | string; token: string },
    thunkAPI
  ) => {
    try {
      return await authService.signinWithProvider(data);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.jwt;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as any;
        state.user = undefined;
        state.token = undefined;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.jwt;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as any;
        state.user = undefined;
        state.token = undefined;
      })
      .addCase(signinWithProvider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinWithProvider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.jwt;
      })
      .addCase(signinWithProvider.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as any;
        state.user = undefined;
        state.token = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
        state.token = undefined;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
