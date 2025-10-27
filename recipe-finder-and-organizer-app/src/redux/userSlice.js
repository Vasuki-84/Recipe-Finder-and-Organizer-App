import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload)); // persist
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("loggedInUser"); // clear
    },
    loadUser: (state) => {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        state.user = JSON.parse(storedUser);
      }
    },
  },
});

export const { login, logout, loadUser } = userSlice.actions;
export default userSlice.reducer;
