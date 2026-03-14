import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
  token: string;
  name: string;
  role: string;
};
type UserState = {
  user: User | null;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      ((state.user = null), (state.isLoggedIn = false));
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
