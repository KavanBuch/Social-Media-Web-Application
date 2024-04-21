import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: undefined,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
  },
});

export const { setClient } = chatsSlice.actions;

export default chatsSlice.reducer;
