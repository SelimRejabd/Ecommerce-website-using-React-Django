import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const response = await axios.get("/users/", {
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

export const fetchUser = createAsyncThunk('fecth-user',
  async (id, {getState}) => {
    const {user} = getState().user;
    const response = await axios.get(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    return response.data;
  }
)

export const deleteUser = createAsyncThunk("delete-user", async (id, {getState}) => {
  const { user } = getState().user;
  await axios.delete(`/users/delete/${id}/`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    }});
  return id;
});

const usersListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "You havn't permission to view this page";
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.error = "You havn't permission to view this page";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersListSlice.reducer;
