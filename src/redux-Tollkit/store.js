import { configureStore} from "@reduxjs/toolkit";
import productsSlice from "../slices/productsSlice";
import filtersSlice from "../slices/filterSlice";
import cartSlice from "../slices/cartSlice";
import orderSlice from "../slices/orderSlice";
import manaProductSlice from "../slices/manageProductSlice";
const store = configureStore({
    
    reducer:{
        productList: productsSlice.reducer,
        filters: filtersSlice.reducer,
        cart: cartSlice.reducer,
        orders: orderSlice.reducer,
        manageProduct: manaProductSlice.reducer
    }
})
export default store