import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import fileCategoryService from "./fileCategoryService";

export const getFileCategories = createAsyncThunk(
  "file-category/get-file-categories",
  async (thunkAPI) => {
    try {
      return await fileCategoryService.getFileCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAFileCategory = createAsyncThunk(
  "file-category/get-file-category",
  async (id, thunkAPI) => {
    try {
      return await fileCategoryService.getFileCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createFileCategory = createAsyncThunk(
  "file-category/create-file-category",
  async (fileCategoryData, thunkAPI) => {
    console.log("slice girdi");
    try {
      return await fileCategoryService.createFileCategory(fileCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAFileCategory = createAsyncThunk(
  "file-category/update-file-category",
  async (fileCategory, thunkAPI) => {
    try {
      return await fileCategoryService.updateFileCategory(fileCategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAFileCategory = createAsyncThunk(
  "file-category/delete-file-category",
  async (id, thunkAPI) => {
    try {
      return await fileCategoryService.deleteFileCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  fileCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const fileCategorySlice = createSlice({
  name: "fileCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFileCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFileCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fileCategories = action.payload;
      })
      .addCase(getFileCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createFileCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFileCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdFileCategory = action.payload;
      })
      .addCase(createFileCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAFileCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAFileCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fileCategoryName = action.payload;
      })
      .addCase(getAFileCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAFileCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAFileCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedFileCategory = action.payload;
      })
      .addCase(updateAFileCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAFileCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAFileCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedFileCategory = action.payload;
      })
      .addCase(deleteAFileCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default fileCategorySlice.reducer;
