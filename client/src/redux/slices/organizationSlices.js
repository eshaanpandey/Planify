import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import organizationService from '../../services/organizationService';

export const getOrganizations = createAsyncThunk(
  'organizations/getAll',
  async () => {
    const response = await organizationService.getAllOrganizations();
    return response.data;
  }
);

export const getOrganizationDetails = createAsyncThunk(
  'organizations/getDetails',
  async (id) => {
    const response = await organizationService.getOrganizationDetails(id);
    return response.data;
  }
);

export const organizationSlice = createSlice({
  name: 'organizations',
  initialState: {
    organizations: [],
    organization: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = action.payload;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrganizationDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrganizationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.organization = action.payload;
      })
      .addCase(getOrganizationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default organizationSlice.reducer;
