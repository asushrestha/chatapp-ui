import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../slice/userlist/userListSlice";
import { getUserProfile } from "../slice/auth/authSlice";
import { Grid, CircularProgress } from '@material-ui/core';
import UserCard from "./userCard/UserCard"



const UserList = (token) => {
    const [userList, setUserList] = useState([]);
    const dispatch = useDispatch();
    const handleUserListFetching = (token) => {
        dispatch(fetchUserList(token))
            .unwrap()
            .then((response) => {
                console.log(response)
                setUserList(response)
            })
            .catch(() => {
                setUserList([]);
            });;
    }
const handleUserProfileFetch =()=>{
    dispatch(getUserProfile()).unwrap()
    .then(resp=> console.log(resp))
    .catch(err=> console.log(err))
}
    useEffect(() => {
        if (token) {
            handleUserListFetching(token)
            handleUserProfileFetch()
        }
    }, [dispatch]);
const selector = useSelector((state)=> state.authData)
console.log(selector)

    return (
        userList?.userList ?
            <Grid container spacing={2} columns={4}>
                {userList.userList.map((user) => (
                    <Grid item key={user.id} >
                        <UserCard user={user} />
                    </Grid>
                ))
                }
            </Grid>
            
            : "No data available"

   
    )

}

export default UserList;