import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import companyService from "./companyService";

export const getCompanies = createAsyncThunk(
  "company/get-companies",
  async (thunkAPI) => {
    try {
      return await companyService.getCompanies();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACompany = createAsyncThunk(
  "company/get-company",
  async (id, thunkAPI) => {
    try {
      return await companyService.getCompany(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCompany = createAsyncThunk(
  "company/create-company",
  async (companyData, thunkAPI) => {
    try {
      return await companyService.createCompany(companyData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateACompany = createAsyncThunk(
  "company/update-company",
  async (company, thunkAPI) => {
    try {
      return await companyService.updateCompany(company);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACompany = createAsyncThunk(
  "company/delete-company",
  async (id, thunkAPI) => {
    try {
      return await companyService.deleteCompany(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  companies: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCompany = action.payload;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.companyName = action.payload;
      })
      .addCase(getACompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCompany = action.payload;
      })
      .addCase(updateACompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCompany = action.payload;
      })
      .addCase(deleteACompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default companySlice.reducer;
