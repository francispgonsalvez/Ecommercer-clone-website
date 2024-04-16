import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userRegister = createAsyncThunk('userRegister', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/users/register`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.error || "An unexpected error occurred";
            return rejectWithValue(errorMessage);
        }
        else {
            return rejectWithValue("Network error.");
        }
    }
});

// userLogin
export const userLogin = createAsyncThunk('userLogin', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/users/login`, data);
        Cookies.set('userToken', response.data.Token);
        Cookies.set('userId', response.data.userId);
        return response.data;
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.error || "An unexpected error occurred";
            return rejectWithValue(errorMessage);
        }
        else {
            return rejectWithValue("Network error.");
        }
    }
});

// add to cart
export const addToCart = createAsyncThunk('addToCart', async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/cart`, { userId, productId, quantity, });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error || "An unexpected error occurred");
    }
}
); 

//   get all cart
export const getAllCarts = createAsyncThunk('getAllCarts', async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/cart/${id}`);

        return response.data;
    } catch (error) {
        return error;
    }
}
);

// update cart 
export const updateQuantity = createAsyncThunk("updateCart", async ({ userId, productId, action }) => {
    try {
        const response = await axios.put(`http://localhost:5001/api/cart/${userId}/${productId}`, { action });
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Delete Cart
export const deleteCart = createAsyncThunk("deleteCart", async ({ userId, productId }) => {
    try {
        await axios.delete(`http://localhost:5001/api/cart/${userId}/${productId}`,);
        return productId;
    } catch (error) {
        throw error;
    }
});

// create checkout session
export const createCheckoutSession = createAsyncThunk('createCheckoutSession', async ({ cartItems, userId, totalPrice }) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/stripe/checkout-session`, { cartItems, userId, totalPrice });
        console.log("response data checkout", response.data);
        if (response.data.url) {
            window.location.href = response.data.url
        }
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const retrieveCheckoutSession = createAsyncThunk('retrieveCheckoutSession', async ({ id, userId }) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/stripe/retrive-checkout-session/${id}/${userId}`,);
        console.log("response data", response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
});

// user orders details
export const getUserOrder = createAsyncThunk('getUserOrder', async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/order/details/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        error: '',
        loading: false,
        cartCount: 0,
        userId: null,
        userCarts: [],
        totalQuantity: 0,
        orderDetails: [],
        UserOrders:[],
    },
    reducers: {
        userLogout: (state) => {
            state.Token = '';
            state.userId = null;
            Cookies.remove('userToken');
            Cookies.remove('userId');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Some error occurred";
            })

            // User Login
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.Token = action.payload;
                state.userId = action.payload;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Some error occurred";
            })

            // Add cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.userCarts = action.payload;
                state.totalQuantity++;
                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Some error occurred";
            })

            // Get All cart
            .addCase(getAllCarts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCarts.fulfilled, (state, action) => {
                state.loading = false;
                state.totalQuantity = action.payload.totalQuantity;
                state.userCarts = action.payload.userCarts;

            })
            .addCase(getAllCarts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Some error occurred";
            })

            // delete Cart
            .addCase(deleteCart.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.loading = false;
                state.userCarts = state.userCarts.map(cart => ({
                    ...cart,
                    items: cart.items.filter(item => item.productDetails._id !== action.payload)

                }));
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })

            // Update Quantity
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.loading = false;
            })

            // Payment retrieve Checkout
            .addCase(retrieveCheckoutSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(retrieveCheckoutSession.fulfilled, (state, { payload }) => {
                state.loading = false
                state.orderDetails = payload
            })
            .addCase(retrieveCheckoutSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred while retrieving session data";
            })

            // User orders details
            .addCase(getUserOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrder.fulfilled, (state, action) => {
                state.loading = true;
                state.UserOrders = action.payload.order;
            })
            .addCase(getUserOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred while retrieving session data";
            })
    },

});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;