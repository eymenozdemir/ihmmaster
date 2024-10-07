import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import contractService from "./contractService";

export const getContracts = createAsyncThunk(
  "contract/get-contracts",
  async (thunkAPI) => {
    try {
      return await contractService.getContracts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAContract = createAsyncThunk(
  "contract/delete-contract",
  async (id, thunkAPI) => {
    try {
      return await contractService.deleteContract(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAContract = createAsyncThunk(
  "contract/get-contract",
  async (id, thunkAPI) => {
    try {
      return await contractService.getContract(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAContract = createAsyncThunk(
  "contract/update-contract",
  async (cont, thunkAPI) => {
    try {
      return await contractService.udpateContract(cont);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const contractState = {
    contract: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const contractSlice = createSlice({
  name: "contract",
  initialState: contractState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getContracts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getContracts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.contract = action.payload;
    })
    .addCase(getContracts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(deleteAContract.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteAContract.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.deletedContract = action.payload;
    })
    .addCase(deleteAContract.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(getAContract.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAContract.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.contractName = action.payload.name;
      state.contractMobile = action.payload.mobile;
      state.contractEmail = action.payload.email;
      state.contractCompany = action.payload.company;
      state.contractInstrument = action.payload.instrument;
      state.contractDuration = action.payload.duration;
      state.contractContent = action.payload.content;
    })
    .addCase(getAContract.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(updateAContract.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateAContract.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updatedContract = action.payload;
    })
    .addCase(updateAContract.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })      
    .addCase(resetState, () => contractState);
  },
});

export default contractSlice.reducer;