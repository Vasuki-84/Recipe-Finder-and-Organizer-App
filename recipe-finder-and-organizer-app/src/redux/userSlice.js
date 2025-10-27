// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: { user: null },
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//     loadUser: (state) => {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) state.user = JSON.parse(storedUser);
//     },
//   },
// });

// export const { login, logout, loadUser } = userSlice.actions;
// export default userSlice.reducer;
