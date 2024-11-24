import localStorage from '@/components/utils/localStorage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axio from "axios";

const BASE_URL = "https://gprglhk7-4000.inc1.devtunnels.ms";

// Define initial state
const initialState = {
  isLoggedIn: false,
  userData: {},
  loadingStatus: 'idle',
  loadingModal: '',
  error: null,
};

// Login User...
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

// Logout User...
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  console.log("Logged Out");
  await localStorage.removeItem("userToken");
  return { isLoggedIn: false };
});

// Get User...
export const getUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const token = await localStorage.getItem("userToken");
    if(token.length > 0){
      const { data } = await axio.get(`${BASE_URL}/auth/user/me`, {
        headers: {
          token
        }
      });
      return data?.data;
    }
  } catch (error) {
    console.error(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
        if(action.payload?.data?.token){
          state.isLoggedIn = true;
          localStorage.setItem("userToken", action.payload?.data?.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.loadingModal = 'login';
        state.error = action.error.message;
      })

      //  Handle Logout
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.loadingModal = 'logout';
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userData = {};
      })


      //  Handle getUser
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

export default authSlice.reducer;
