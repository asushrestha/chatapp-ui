import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth/authSlice'
import userListReducer from './slice/userlist/userListSlice'
import chatRoomInfoReducer from './slice/chatRoom/roomSlice'

const store = configureStore({
  reducer: {
    authData: authReducer,
    userList: userListReducer,
    chatRoomInfo: chatRoomInfoReducer
  }
})
export default store;