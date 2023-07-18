import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

// Async thunk action to handle user registration
export const registerUser = createAsyncThunk(
  '/register',
  async ({ email, password }) => {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    return response.user;
  }
);

// Async thunk action to handle user login
export const loginUser = createAsyncThunk(
  '/login',
  async ({ email, password }) => {
    const response = await auth.signInWithEmailAndPassword(email, password);
    return response.user;
  }
);
export const logoutUser = createAsyncThunk('/logout', async () => {
  await auth.signOut();
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuthenticated:false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.currentUser = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
