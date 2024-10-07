import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authServices";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginQuickbooks = createAsyncThunk(
  "auth/login-quickbooks",
  async (thunkAPI) => {
    try {
      return await authService.loginQuickbooks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCompanyInfo = createAsyncThunk(
  "auth/get-company-info",
  async (thunkAPI) => {
    try {
      return await authService.getCompanyInfo();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCompanyInfoGetter = createAsyncThunk(
  "auth/get-company-info-getter",
  async (thunkAPI) => {
    try {
      return await authService.getCompanyInfoGetto();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginQuickbooksTn = createAsyncThunk(
  "auth/login-quickbooks-tn",
  async (thunkAPI) => {
    try {
      return await authService.loginQuickbooksTn();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCompanyInfoTn = createAsyncThunk(
  "auth/get-company-info-tn",
  async (thunkAPI) => {
    try {
      return await authService.getCompanyInfoTn();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCompanyInfoGetterTn = createAsyncThunk(
  "auth/get-company-info-getter-tn",
  async (thunkAPI) => {
    try {
      return await authService.getCompanyInfoGettoTn();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const getSalesDb = createAsyncThunk(
  "sale/get-sales-db",
  async (thunkAPI) => {
    try {
      return await authService.getSalesFromDb();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const isLoggedIn = createAsyncThunk(
  "sale/is-logged-in",
  async (thunkAPI) => {
    try {
      return await authService.isLoggedIn();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const isLoggedInTn = createAsyncThunk(
  "sale/is-logged-in-tn",
  async (thunkAPI) => {
    try {
      return await authService.isLoggedInTn();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAnOrder = createAsyncThunk(
  "order/update-order",
  async (order, thunkAPI) => {
    try {
      return await authService.updateOrder(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSales = createAsyncThunk(
  "sale/get-sales",
  async (thunkAPI) => {
    try {
      return await authService.getSales();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const createAnOrder = createAsyncThunk(
  "order/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAnOrder = createAsyncThunk(
  "order/delete-order",
  async (id, thunkAPI) => {
    try {
      return await authService.deleteOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderByUser = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createUsers = createAsyncThunk(
  "auth/create-user",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await authService.createUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getAUser = createAsyncThunk(
  "auth/get-user",
  async (id, thunkAPI) => {
    try {
      //console.log("sliced", id);
      return await authService.getUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/get-users",
  async (thunkAPI) => {
    try {
      return await authService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsersByCompany = createAsyncThunk(
  "auth/get-user-by-company",
  async (id, thunkAPI) => {
    try {
      return await authService.getUsersByCompany(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsersByVessel = createAsyncThunk(
  "auth/get-user-by-vessel",
  async (id, thunkAPI) => {
    try {
      return await authService.getUsersByVessel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAUser = createAsyncThunk(
  "auth/delete-user",
  async (id, thunkAPI) => {
    try {
      //console.log("sliced", id);
      return await authService.deleteUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getASale = createAsyncThunk(
  "auth/get-sale",
  async (id, thunkAPI) => {
    try {
      //console.log("sliced", id);
      return await authService.getSale(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAnOrder = createAsyncThunk(
  "auth/get-order",
  async (id, thunkAPI) => {
    try {
      //console.log("sliced", id);
      return await authService.getSingleOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteASale = createAsyncThunk(
  "auth/delete-sale",
  async (id, thunkAPI) => {
    try {
      //console.log("sliced", id);
      return await authService.deleteSale(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAUser = createAsyncThunk(
  "auth/update-user",
  async (user, thunkAPI) => {
    try {
      return await authService.updateUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
    .addCase(loginQuickbooksTn.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginQuickbooksTn.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.qbUserTn = action.payload;
      state.message = "success";
    })
    .addCase(loginQuickbooksTn.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      state.isLoading = false;
    })
    .addCase(loginQuickbooks.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginQuickbooks.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.qbUser = action.payload;
      state.message = "success";
    })
    .addCase(loginQuickbooks.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      state.isLoading = false;
    })
    .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(deleteAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedOrder = action.payload;
      })
      .addCase(deleteAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteASale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteASale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedSale = action.payload;
      })
      .addCase(deleteASale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.sales = action.payload;
        state.message = "success";
      })
      .addCase(getSales.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getSalesDb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesDb.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.salesDB = action.payload;
        state.message = "success";
      })
      .addCase(getSalesDb.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(isLoggedIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.atlantaLogin = action.payload;
        state.message = "success";
      })
      .addCase(isLoggedIn.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(isLoggedInTn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isLoggedInTn.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.nashvilleLogin = action.payload;
        state.message = "success";
      })
      .addCase(isLoggedInTn.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getCompanyInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyInfo.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.companyInfo = action.payload;
        state.message = "success";
      })
      .addCase(getCompanyInfo.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getCompanyInfoTn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyInfoTn.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.companyInfoTn = action.payload;
        state.message = "success";
      })
      .addCase(getCompanyInfoTn.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getCompanyInfoGetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyInfoGetter.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.companyInfoGot = action.payload;
        state.message = "success";
      })
      .addCase(getCompanyInfoGetter.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getCompanyInfoGetterTn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyInfoGetterTn.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.companyInfoGotTn = action.payload;
        state.message = "success";
      })
      .addCase(getCompanyInfoGetterTn.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrderByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderbyuser = action.payload;
        state.message = "success";
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(createUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdOrder = action.payload;
      })
      .addCase(createAnOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userName = action.payload;
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUsersByCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersByCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsersByCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUsersByVessel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersByVessel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsersByVessel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedUser = action.payload;
      })
      .addCase(deleteAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getASale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getASale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sale = action.payload;
      })
      .addCase(getASale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
      })
      .addCase(updateAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedOrder = action.payload;
      })
      .addCase(updateAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
