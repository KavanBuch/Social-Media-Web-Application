import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state) => {
      const loggedInUser = localStorage.getItem("user");
      state.user = loggedInUser ? loggedInUser : null;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
