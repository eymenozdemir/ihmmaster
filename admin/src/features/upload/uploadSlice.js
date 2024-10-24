import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "upload/files",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("files", data[i]);
      }
      //console.log(formData);
      return await uploadService.uploadFile(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const downloadFile = createAsyncThunk(
  "upload/files/download",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await uploadService.downloadFile(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const delFile = createAsyncThunk(
  "delete/files",
  async (id, thunkAPI) => {
    try {
      await uploadService.deleteFile(id.id);
      return id.files.filter(i => i.public_id!==id.id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const delImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      await uploadService.deleteImg(id.id);
      return id.images.filter(i => i.public_id!==id.id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loadImg = createAsyncThunk(
  "load/images",
  async (data, thunkAPI) => {
    try {
      await (async () => {
        return; 
      })();
      return data!==undefined ? data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetImg = createAction("Reset_all");

const initialState = {
  files: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const uploadSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images.push(action.payload[0]);
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.files = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(downloadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.filesdownloaded = action.payload;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      })
      .addCase(delFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.files = action.payload;
      })
      .addCase(delFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      })
      .addCase(loadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(loadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      })
      .addCase(resetImg, () => initialState);
  },
});
export default uploadSlice.reducer;
