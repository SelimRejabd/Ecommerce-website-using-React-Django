import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(`/products/`);
    return res.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const res = await axios.get(`/products/${id}`);
    return res.data;
  }
);

export const fetchProductList = createAsyncThunk(
  "products/productList",
  async ({getState}) => {
    const {user} = getState().user;
    const res = await axios.get(`products/product-list/`,
    {headers
      : {
        Authorization: `Bearer ${user.token}`
      }
    }
    );
    return res.data;
  }
);


export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, {getState}) => {
    const {user} = getState().user;
    const res = await axios.post(`/products/add/`, formData, 
    {headers
      : {
        Authorization: `Bearer ${user.token}`
      }
    }
    );
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (formData, {getState}) => {
    const {user} = getState().user;
    const id = formData.get("id");
    const res = await axios.put(`/products/update/${id}/`, formData, 
    {headers
      : {
        Authorization: `Bearer ${user.token}`
      }
    }
    );
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, {getState}) => {
    const {user} = getState().user;
    const res = await axios.delete(`/products/delete/${id}/`,
    {headers
      : {
        Authorization: `Bearer ${user.token}`,
      }
    }
    );
    return res.data;
  }
);

export const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    isLoading: true,
    products: [],
    error: null,
    product: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.product = null;
        state.error = action.error.message;
      })
      .addCase(fetchProductList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
        state.error = null;
        state.successMessage = "Product added successfully";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.error = null;
        state.successMessage = "Product updated successfully";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { clearMessages } = ProductSlice.actions;
export default ProductSlice.reducer;
