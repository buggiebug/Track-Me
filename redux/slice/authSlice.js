import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axio from "axios";

const BASE_URL = "https://gprglhk7-4000.inc1.devtunnels.ms";

// Define initial state
const initialState = {
  userData: {},
  loadingStatus: 'idle',
  loadingModal: '',
  error: null,
};

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    try {
      const { data } = await axio.post(`${BASE_URL}/auth/login`, credentials);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (token) => {
  try {
    const { data } = await axio.get(`${BASE_URL}/auth/user/me`, {
      headers: {
        token
      }
    });
    return data?.data;
  } catch (error) {
    console.error(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //  Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.loadingModal = 'login';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.loadingModal = 'login';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.loadingModal = 'login';
        state.error = action.error.message;
      })


      // Handle getUser
      .addCase(getUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.loadingModal = 'getUser';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.loadingModal = 'getUser';
        state.userData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.loadingModal = 'getUser';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
