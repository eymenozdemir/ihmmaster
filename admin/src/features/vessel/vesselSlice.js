import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import vesselService from "./vesselService";

export const getVessels = createAsyncThunk(
  "vessel/get-vessels",
  async (thunkAPI) => {
    try {
      return await vesselService.getVessels();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getVesselsByCompany = createAsyncThunk(
  "vessel/get-vessels-by-company",
  async (id, thunkAPI) => {
    try {
      return await vesselService.getVesselsByCompany(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getVesselsByVessel = createAsyncThunk(
  "vessel/get-vessels-by-vessel",
  async (id, thunkAPI) => {
    try {
      return await vesselService.getVesselsByVessel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAVessel = createAsyncThunk(
  "vessel/get-vessel",
  async (id, thunkAPI) => {
    try {
      return await vesselService.getVessel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createVessel = createAsyncThunk(
  "vessel/create-vessel",
  async (vesselData, thunkAPI) => {
    try {
      return await vesselService.createVessel(vesselData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAVessel = createAsyncThunk(
  "vessel/update-vessel",
  async (vessel, thunkAPI) => {
    try {
      return await vesselService.updateVessel(vessel);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAVessel = createAsyncThunk(
  "vessel/delete-vessel",
  async (id, thunkAPI) => {
    try {
      return await vesselService.deleteVessel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  vessels: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const vesselSlice = createSlice({
  name: "vessels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVessels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVessels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.vessels = action.payload;
      })
      .addCase(getVessels.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getVesselsByCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVesselsByCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.vessels = action.payload;
      })
      .addCase(getVesselsByCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getVesselsByVessel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVesselsByVessel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.vessels = action.payload;
      })
      .addCase(getVesselsByVessel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createVessel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVessel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdVessel = action.payload;
      })
      .addCase(createVessel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAVessel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAVessel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.VesselName = action.payload;
      })
      //if you need other informations of vessels change above
      .addCase(getAVessel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAVessel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAVessel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedVessel = action.payload;
      })
      .addCase(updateAVessel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAVessel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAVessel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedVessel = action.payload;
      })
      .addCase(deleteAVessel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default vesselSlice.reducer;
