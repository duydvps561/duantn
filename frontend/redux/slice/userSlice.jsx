import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: null,
    token: null,
  },
  reducers: {
    // lưu lại thông tin người dùng
    setUser: (state, action) => {
      state.info = action.payload.user; // Giữ thông tin người dùng
      state.token = action.payload.token; // Giữ token
    },
    // xóa thông tin người dùng
    clearUser: (state) => {
      state.info = null;
      state.token = null;
    },
  },
});

// Export actions to be used in components
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer to be added to the store
export default userSlice.reducer;
