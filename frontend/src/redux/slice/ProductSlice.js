import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// get all products
export const getProducts = createAsyncThunk('getProducts', async ({categoryId}) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/products/?categoryId=${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// create products
export const createProduct = createAsyncThunk('createProduct', async (data) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/products`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// productId fetching
export const getProductById = createAsyncThunk("getProductById", async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// update product
export const editProduct = createAsyncThunk("editProduct", async ({ id, data }) => {
    try {
        const response = await axios.put(`http://localhost:5001/api/products/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Delete product
export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5001/api/products/${id}`);
        console.log(response.data);
        return id;
    } catch (error) {
        throw error
    }
});



const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        error: '',
        loading: false,
        categoryId: '',
        productById: [],
    },
    reducers: {
        updateCategoryId(state, action) {
          state.categoryId = action.payload;
        }
      },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.products;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = "Some error occurred";
        })

        // create Category
        .addCase(createProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = "Some error occurred";
        })

        // product Id fetching
        .addCase(getProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.productById = action.payload.product;
        })

        // update product
        .addCase(editProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(editProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(editProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = "Some error occurred";
        })

        // delete product
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = state.product.filter(product => product._id !== action.payload);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = "Some error occurred";
        })
    },
});

export const { updateCategoryId } = productSlice.actions; 
export default productSlice.reducer;