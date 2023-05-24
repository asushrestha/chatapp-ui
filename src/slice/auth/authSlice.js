import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../../service/AuthService";

const initialState = {
  loading: false,
  userProfile: {},
  user: null,
  userToken: null,
  error: null,
  success: false,


}

const createAuthSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload.userProfile;
        console.log(action.payload)

      })
      .addCase(getUserProfile.pending, (state,) => {
        state.loading = true

      })
      .addCase(getUserProfile.rejected, (state) => {
        state.loading = false
        state.error = "Failed to load  maessage"

      })
      .addCase(markUserAsOnline.fulfilled, (state, action) => {
        state.userProfile = action.payload.userProfile;
        console.log(action.payload)

      })
      .addCase(markUserAsOnline.pending, (state,) => {
        state.loading = true

      })
      .addCase(markUserAsOnline.rejected, (state) => {
        state.loading = false
        state.error = "Failed to load  maessage"

      })
      .addCase(markUserAsOffline.fulfilled, (state, action) => {
        state.userProfile = action.payload.userProfile;
        console.log(action.payload)

      })
      .addCase(markUserAsOffline.pending, (state,) => {
        state.loading = true

      })
      .addCase(markUserAsOffline.rejected, (state) => {
        state.loading = false
        state.error = "Failed to load  maessage"

      })
  },
})


export const login = createAsyncThunk(
  "auth/login",
  async ({ userName, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(userName, password);
      const parsedData = data;
      return { user: parsedData };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const markUserAsOnline = createAsyncThunk(
  "users/go-online",
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken")

      const data = await AuthService.markUserAsOnline(token);
      console.log("online" + data)
      return { userInfo: data, userProfile: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getUserProfile = createAsyncThunk(
  "users/get-user-profile",
  async (thunkAPI) => {
    try {
     const  token = localStorage.getItem("userToken")
      const data = await AuthService.getUserProfile(token);
      console.log("user profile " + data)
      return { userProfile: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const markUserAsOffline = createAsyncThunk(
  "users/go-offline",
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken")

      console.log(token)
      const data = await AuthService.markUserAsOffline(token);
      console.log("offline data " + data)
      return { userInfo: data, userProfile: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


export default createAuthSlice.reducer