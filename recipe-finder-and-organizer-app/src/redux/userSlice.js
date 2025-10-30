import { createSlice } from "@reduxjs/toolkit";
const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

const userSlice = createSlice({
  name: "user",
  initialState:{  user: storedUser || null, }, //  Keep user logged in after refresh
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("loggedInUser"); 
    },
    loadUser: (state) => {
      const storedUser = localStorage.getItem("loggedInUser");  // stores the user details even we refresh
      if (storedUser) {
        state.user = JSON.parse(storedUser);
      }
    },
  },
});

export const { login, logout, loadUser } = userSlice.actions;
export default userSlice.reducer;
