import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

const initialState = {
  user: undefined,
};

export const setUser = createAsyncThunk("setUser", async () => {
  const { data } = await api.getCurrentUser();
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUser.fulfilled, (state, action) => {
      localStorage.setItem("user", action.payload);
      const loggedInuser = localStorage.getItem("user");
      state.user = loggedInuser ? loggedInuser : undefined;
    });
  },
});

export default userSlice.reducer;
