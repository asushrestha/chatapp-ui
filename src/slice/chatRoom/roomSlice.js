import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatRoomService from "../../service/ChatRoomService";
import { setMessage } from "../auth/message";
import StompService from "../../config/StompConfig";

const initialState = {
  loading: false,
  chatHeadList: [],
  userToken: null,
  error: null,
  success: false,
  chatMessageInfo: [],
}
const createChatRoomSlice = createSlice({
  name: 'chatHeadList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesByChatRoomId.fulfilled, (state, action) => {
        state.chatMessageInfo = action.payload.chatMessageInfo;
        console.log(action.payload)

      })
      .addCase(fetchMessagesByChatRoomId.pending, (state,) => {
        state.loading = true

      })
      .addCase(fetchMessagesByChatRoomId.rejected, (state) => {
        state.loading = false
        state.error = "Failed to load chat maessage"

      })
      .addCase(updateChatMessage.fulfilled, (state, action) => {
        state.chatMessageInfo = action.payload.chatMessageInfo;

      })
      .addCase(updateChatHeadList.fulfilled, (state, action) => {
        state.chatHeadList = action.payload.chatHeadList;

      })
      .addCase(fetchChatHeadList.fulfilled,(state,action)=>{
        state.chatHeadList = action.payload.chatHeadList;

      })
  },
})

const token = localStorage.getItem('userToken');

export const createChatRoom = createAsyncThunk(
  "users/chatroom/chat-list",
  async ({ id }, thunkAPI) => {
    try {

      console.log("inside slice:" + token + ":;" + id)

      const data = await ChatRoomService.createChatRoomIfNotExists(token, id);
      return { chatRoomInfo: data };
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

export const fetchMessagesByChatRoomId = createAsyncThunk(
  "users/chatroom/fetch",
  async ({ chatRoomId }, thunkAPI) => {
    try {
      console.log("inside slice:" + token + ":;" + chatRoomId)
      const data = await ChatRoomService.fetchMessagesByChatRoomId(token, chatRoomId);
      const responseData = await data;
      return { chatMessageInfo: responseData };
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
export const fetchChatHeadList = createAsyncThunk(
  "users/chatroom/fetch/chat-head",
  async (thunkAPI) => {
    try {
      console.log("inside slice:" + token + ":;")
      const data = await ChatRoomService.fetchChatHeadList(token);
      return { chatHeadList: data };
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


export const sendMessageToSocket = createAsyncThunk(
  "users/chatroom/send-message",
  async ({ chatId, plainText }, thunkAPI) => {

    try {
      StompService.sendMessageInSocket({ chatId, plainText });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error.response + ":::" + error)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
// export const subscribeThisRoomId = createAsyncThunk(
//   "users/chatroom/subscribe-room",
//   async (chatId, thunkAPI) => {

//     try {
//       StompService.subscribeThisRoomId(chatId);

//       return {};
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(error.response + ":::" + error)
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );

export const unSubscribeThisRoomId = createAsyncThunk(
  "users/chatroom/unsubscribe-room",
  async (chatId, thunkAPI) => {

    try {
      console.log(chatId)
      StompService.unSubscribeThisRoomId(chatId);

      return {};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error.response + ":::" + error)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateChatMessage = createAsyncThunk(
  "users/chatroom/update-room",
  async (chatMessageResponse, thunkAPI) => {

    try {
      console.log("before update")
      console.log(chatMessageResponse)
      console.log("after update")

      return { chatMessageInfo: chatMessageResponse };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error.response + ":::" + error)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateChatHeadList = createAsyncThunk(
  "users/chatlist/update-list",
  async (chatHeadListResponse, thunkAPI) => {

    try {
      console.log(chatHeadListResponse)
      console.log("after chate head replaced")

      return { chatHeadList: chatHeadListResponse };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error.response + ":::" + error)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// subscribeThisRoomId// export const subscribeThisRoomId = (chatId) => {
// export const  = createAsyncThunk(
//   "users/chatroom/subscribe-room",
//   async (chatId, thunkAPI) => {

//     if (!client.connected) {
//       StompConfig();
//     }

//     try {
//       client.onConnect = () => {
//         client.subscribe(
//           `/topic/queue/message/room/${chatId}`, (response) => {
//             console.log("queue data + " + response.body)
//             // updateChatMessage(chatId);

//             return {chatMessageInfo: response.body}
//           },);
//       }

//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(error.response + ":::" + error)
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }

//   })
export default createChatRoomSlice.reducer;
