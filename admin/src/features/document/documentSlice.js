import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import documentService from "./documentService";

export const getDocuments = createAsyncThunk(
  "document/get-documents",
  async (thunkAPI) => {
    try {
      return await documentService.getDocuments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDocumentsByCompany = createAsyncThunk(
  "document/get-documents-by-company",
  async (id, thunkAPI) => {
    try {
      return await documentService.getDocumentsByCompany(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDocumentsByVessel = createAsyncThunk(
  "document/get-documents-by-vessel",
  async (id, thunkAPI) => {
    try {
      return await documentService.getDocumentsByVessel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getADocument = createAsyncThunk(
  "document/get-document",
  async (id, thunkAPI) => {
    try {
      return await documentService.getDocument(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createDocument = createAsyncThunk(
  "document/create-document",
  async (documentData, thunkAPI) => {
    try {
      return await documentService.createDocument(documentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateADocument = createAsyncThunk(
  "document/update-document",
  async (document, thunkAPI) => {
    try {
      return await documentService.updateDocument(document);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const updateADocumentStatus = createAsyncThunk(
  "document/update-document-status",
  async (document, thunkAPI) => {
    try {
      return await documentService.updateDocumentStatus(document);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteADocument = createAsyncThunk(
  "document/delete-document",
  async (id, thunkAPI) => {
    try {
      return await documentService.deleteDocument(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  documents: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.documents = action.payload;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getDocumentsByCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocumentsByCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.documents = action.payload;
      })
      .addCase(getDocumentsByCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getDocumentsByVessel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocumentsByVessel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.documents = action.payload;
      })
      .addCase(getDocumentsByVessel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdDocument = action.payload;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getADocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getADocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.documentName = action.payload;
      })
      .addCase(getADocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateADocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateADocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedDocument = action.payload;
      })
      .addCase(updateADocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateADocumentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateADocumentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedDocument = action.payload;
      })
      .addCase(updateADocumentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteADocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteADocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedDocument = action.payload;
      })
      .addCase(deleteADocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default documentSlice.reducer;
