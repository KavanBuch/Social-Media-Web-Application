import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

const initialState = {
  user: undefined,
  isLoading: false,
  profile: null,
};

export const setUser = createAsyncThunk("setUser", async () => {
  const { data } = await api.getCurrentUser();
  return data;
});

export const getUserProfile = createAsyncThunk(
  "userProfile",
  async (username) => {
    const { data } = await api.getUserProfile(username);
    return data;
  }
);

export const updateProfile = createAsyncThunk("updateProfile", async (Data) => {
  const { data } = await api.updateProfile(Data);
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.isLoading = false;
      localStorage.setItem("user", action.payload);
      const loggedInuser = localStorage.getItem("user");
      state.user = loggedInuser ? loggedInuser : undefined;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
  },
});

export default userSlice.reducer;
