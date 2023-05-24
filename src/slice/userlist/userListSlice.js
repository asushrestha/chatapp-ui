import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserListService from "../../service/UserListService";
import { setMessage } from "../auth/message";
const initialState = {
    loading: false,
    userList: [], 
    userToken: null, 
    error: null,
    success: false,
  }
  const token = localStorage.getItem("userToken");
  const userListSlice = createSlice({
    name: 'userList',
    initialState,
    reducers: {},
    extraReducers:(builder)=> {
      builder
       .addCase(fetchUserList.fulfilled, (state, action) => {
        state.userList = action.payload.userList;
        console.log(action.payload)

      })
      .addCase(fetchUserList.pending, (state,) => {
        state.loading = true

      })
      .addCase(fetchUserList.rejected, (state) => {
        state.loading = false
        state.error = "Failed to load userlist "

      })
      
    },                                                                                
  })

export const fetchUserList = createAsyncThunk(
    "users/list",
    async (token , thunkAPI) => {
      try {
        const data = await UserListService.fetchUserList(token);
        return { userList: data };
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

  
  export default userListSlice.reducer;