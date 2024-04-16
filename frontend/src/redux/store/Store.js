import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../slice/CategorySlice";
import ProductSlice from "../slice/ProductSlice";
import AdminSlice from "../slice/AdminSlice";
import UserSlice from "../slice/UserSlice";

 const store = configureStore({
    reducer: {
        admin: AdminSlice,
        category: CategorySlice,
        product: ProductSlice,
        user: UserSlice,
    },
})

export default store;