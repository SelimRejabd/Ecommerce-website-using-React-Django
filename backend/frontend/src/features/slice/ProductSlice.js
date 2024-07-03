import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk("products/fetchProducts",
    async ()=> {
        const res = await axios.get(`/products/`);
        return res.data;
    })

export const ProductSlice = createSlice( {
    name: 'Product',
    initialState: {
        isLoading: true,
        products:[],
        error : null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.products = action.payload;
            state.error = null;
        });
        builder.addCase(fetchProducts.rejected, (state, action)=>{
            state.isLoading = false;
            state.products = [];
            state.error = action.error.message;
        })
    }
});

export default ProductSlice.reducer;