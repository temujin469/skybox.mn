import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import setting from './setting/reducer';
import app from './app/reducer';
// import ecomerce from './ecomerce/reducer';
import cartReducer from "./slices/cartSlice";
import compareReducer from "./slices/compareSlice";
import wishlistReducer from "./slices/wishlistSlice";
import ecomerceReducer from "./ecomerce/ecomerceSlice"


export default combineReducers({
    auth:authReducer,
    setting,
    app,
    ecomerce:ecomerceReducer,
    cart:cartReducer,
    compare:compareReducer,
    wishlist:wishlistReducer
});
