import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostId: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { setPostId } = postSlice.actions;

export default postSlice.reducer;
