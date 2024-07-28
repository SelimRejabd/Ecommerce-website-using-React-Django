import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  order: null,
  orders: [],
  loading: false,
  error: null,
  orderData: null,
};

export const saveOrder = createAsyncThunk(
  "order/saveOrder",
  async (orderData, {getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const response = await axios.post("orders/add/", orderData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const response = await axios.get(`/orders/${orderId}/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', async (_, { getState }) => {
  const { user } = getState().user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get('/orders/myorders', config);
  return response.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
