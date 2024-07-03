import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/slice/ProductSlice";
import CartReducer from "../features/slice/CartSlice";
import UserLoginReducer from "../features/slice/UserLoginSlice";
import UserRegisterReducer from "../features/slice/UserRegisterSlice";
import UserDetailsReducer from "../features/slice/UserDetailsSlice";
import OrderReducer from "../features/slice/OrderSlice";
import usersListReducer from "../features/slice/usersListSlice";

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    user: UserLoginReducer,
    usersList: usersListReducer,
    userRegister: UserRegisterReducer,
    userDetails: UserDetailsReducer,
    order: OrderReducer,
  }
});


export default store;