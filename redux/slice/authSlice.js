import localStorage from '@/components/utils/localStorage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../api/axiosInstance";
import Notify from '@/components/utils/Notify';
import { getAllExpenses } from './expenseSlice';

// Define initial state
const initialState = {
  isLoggedIn: false,
  userData: {},
  loadingStatus: 'idle',
  loadingModal: '',
  error: null,
};

// Create User...
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (credentials) => {
    try {
      const { data } = await axiosInstance.post(`/auth/signup`, credentials);
      Notify(data.message, 0)
      return data;
    } catch (error) {
      const err = error?.response?.data?.message || error?.message
      Notify(err, 1)
    }
  }
);

// Login User...
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    try {
      const { data } = await axiosInstance.post(`/auth/login`, credentials);
      Notify(data.message, 0)
      return data;
    } catch (error) {
      const err = error?.response?.data?.message || error?.message
      Notify(err, 1)
    }
  }
);

// Logout User...
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await localStorage.removeItem("userToken");
  return { isLoggedIn: false };
});

// Get User...
export const getUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/user/me`);
    return data?.data;
  } catch (error) {
    const err = error?.response?.data?.message || error?.message
    Notify(err, 1)
  }
});

// Update User...
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.patch(`/auth/user/me/update`, credentials);
      thunkAPI.dispatch(getAllExpenses());
      return data?.data;
    } catch (error) {
      const err = error?.response?.data?.message || error?.message;
      Notify(err, 1);
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //  Handle signupUser
      .addCase(signupUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.loadingModal = 'signup';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.loadingModal = 'signup';
        if (action.payload?.data) {
          state.isLoggedIn = true;
          localStorage.setItem("userToken", action.payload?.data);
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.loadingModal = 'signup';
        state.error = action.error.message;
      })

      //  Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.loadingModal = 'login';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.loadingModal = 'login';
        if (action.payload?.data?.token) {
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
      })

      //  Update user
      .addCase(updateUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.loadingModal = 'updateUser';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.loadingModal = 'updateUser';
        state.userData = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.loadingModal = 'updateUser';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
