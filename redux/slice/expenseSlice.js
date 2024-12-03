import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Notify from '@/components/utils/Notify';

import axiosInstance from "../api/axiosInstance";

// Define initial state
const initialState = {
  expenseData: [],
  loadingStatus: 'idle',
  loadingModal: '',
  error: null,
  message: ','
};

export const clearState = createAsyncThunk(
  "expenses/clearState",
  async (_, { rejectWithValue }) => {
    initialState.loadingModal = "";
    initialState.loadingStatus = "idle";
    initialState.error = null;
    initialState.message = "";
  }
);

// Get ALl Expenses...
export const getAllExpenses = createAsyncThunk(
  "expenses/getAllExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/user/expense`);
      return data;
    } catch (error) {
      // Capture error message and reject with value
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
      Notify(errorMessage, 1)
      return rejectWithValue(errorMessage);
    }
  });


// Create new Expenses...
export const createExpense = createAsyncThunk(
  "expenses/createExpense",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/user/expense/create`, formData);
      Notify(data.message, 0)
      return data;
    } catch (error) {
      // Capture error message and reject with value
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
      Notify(errorMessage, 1)
      return rejectWithValue(errorMessage);
    }
  });


const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Get All Expenses...
      .addCase(getAllExpenses.pending, (state) => {
        state.loadingStatus = 'loading';
        state.loadingModal = 'getAllExpenses';
      })
      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.loadingModal = 'getAllExpenses';
        state.expenseData = action.payload?.data?.expenseData;
      })
      .addCase(getAllExpenses.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.loadingModal = 'getAllExpenses';
        state.error = action.payload;
      })

      // Handle Create New Expenses...
      .addCase(createExpense.pending, (state) => {
        state.loadingStatus = 'loading';
        state.loadingModal = 'createExpense';
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.loadingModal = 'createExpense';
        state.message = action.payload?.message;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.loadingModal = 'createExpense';
        state.error = action.payload;
      })

  },
});

export default expenseSlice.reducer;
