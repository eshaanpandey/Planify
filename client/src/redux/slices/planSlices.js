import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import planService from '../../services/planService';

export const fetchPlans = createAsyncThunk('plans/fetchAll', async (_, thunkAPI) => {
  try {
    return await planService.getAllPlans();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createPlan = createAsyncThunk('plans/create', async (planData, thunkAPI) => {
  try {
    return await planService.createPlan(planData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updatePlan = createAsyncThunk('plans/update', async ({ id, data }, thunkAPI) => {
  try {
    return await planService.updatePlan(id, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deletePlan = createAsyncThunk('plans/delete', async (id, thunkAPI) => {
  try {
    return await planService.deletePlan(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const planSlice = createSlice({
  name: 'plans',
  initialState: {
    plans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default planSlice.reducer;
