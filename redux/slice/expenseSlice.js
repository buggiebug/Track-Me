import localStorage from '@/components/utils/localStorage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import axio from "axios";
const BASE_URL = "https://gprglhk7-4000.inc1.devtunnels.ms";

// Define initial state
const initialState = {
  expenseData: [],
  loadingStatus: 'idle',
  loadingModal: '',
  error: null,
  message: ','
};

// Get ALl Expenses...
export const getAllExpenses = createAsyncThunk(
  "expenses/getAllExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axio.get(`${BASE_URL}/user/expense`, {
        headers: {
          token: await localStorage.getItem('userToken')
        }
      });
      return data;
    } catch (error) {
      console.log(error);
      // Capture error message and reject with value
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
      return rejectWithValue(errorMessage);
    }
  });


// Create new Expenses...
export const createExpense = createAsyncThunk(
  "expenses/createExpense",
  async ({ formData }, { rejectWithValue }) => {
    console.log(formData);
    try {
      const { data } = await axio.post(`${BASE_URL}/user/expense/create`, formData, {
        headers: {
          token: await localStorage.getItem('userToken')
        }
      });
      return data;
    } catch (error) {
      // Capture error message and reject with value
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
      console.error(errorMessage);
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
