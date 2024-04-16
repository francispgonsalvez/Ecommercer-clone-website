import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// get all category
export const getCategories = createAsyncThunk('getCategory', async () => {
    try {
        const response = await axios.get(`http://localhost:5001/api/categorys/`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// create Category
export const createCategory = createAsyncThunk('createCategory', async (data) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/categorys/`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// categoryId fetching
export const getCategoryById = createAsyncThunk("getCategoryById", async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/categorys/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// update Category
export const editCategory = createAsyncThunk("editCategory", async ({ id, data }) => {
    try {
        const response = await axios.put(`http://localhost:5001/api/categorys/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Delete Category
export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5001/api/categorys/${id}`);
        console.log(response.data);
        return id;
    } catch (error) {
        throw error
    }
});



const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: [],
        error: '',
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload.categorys;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })

            // create Category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })

            // Category Id fetching
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.loading = false;
            })

            // update category
            .addCase(editCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })

            // delete Category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = state.category.filter(category => category._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })
    },
});

export default categorySlice.reducer;