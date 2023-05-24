import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { Fragment } from 'react'
import Login from './component/Login';
import Register from './component/Register';
import UserList from './component/UserList';
import ChatRoomList from './component/ChatRoomList';
import  HeaderBar from './component/HeaderBar'
import Signin from './component/NewLogin';

function App() {
  const token = localStorage.getItem('userToken');
  
  if (!token || token===null) {
    return (
      <Router>
        <Fragment>
          <Routes>
            <Route path="/register" element={<Register />}>

            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/new-login" element={<Signin />}>

            </Route>
            <Route path="/" element={<Login />}>
            </Route>
          </Routes>
        </Fragment>

      </Router>
    )
  }
  else {
    return (

      <Router>
        <Fragment>
          <HeaderBar/>
          <Routes>
            <Route path="/list-room/:id" element={<ChatRoomList />}>
            </Route>
            <Route path="/list-all" element={<UserList />}>
            </Route>
            <Route path="/" element={<UserList />}>
            </Route>
          </Routes>
        </Fragment>
      </Router>
    );
  }
}

export default App;
