import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const getAdminInfo = createAsyncThunk('getAdminInfo', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/admin/login`, data);
        Cookies.set('adminToken', response.data.token);
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

export const getAllOrders = createAsyncThunk('getAllOrders', async () => {
    try {
        const response = await axios.get(`http://localhost:5001/api/order/`);
        return response.data;
    } catch (error) {
        return error;
    }
}
);
export const getOrderById = createAsyncThunk('getOrderById', async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/order/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        error: '',
        loading: false,
        orders: [],
        orderById:[],
    },
    reducers: {
        logout: (state) => {
            state.token = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminInfo.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(getAdminInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(getAdminInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Some error occurred";
            })

            // getAllOrders
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Some error occurred";
            })

            // getOrderById
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.orderById = action.payload.orderById;
            })
    },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;