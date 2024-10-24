import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import companyReducer from "../features/company/companySlice";
import vesselReducer from "../features/vessel/vesselSlice";
import documentReducer from "../features/document/documentSlice";
import fileCategoryReducer from "../features/fileCategory/fileCategorySlice";
import uploadReducer from "../features/upload/uploadSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    vessel: vesselReducer,
    document: documentReducer,
    fileCategory: fileCategoryReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});
