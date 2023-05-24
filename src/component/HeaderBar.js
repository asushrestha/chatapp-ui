import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { client } from "../config/StompConfig";
import { useDispatch, useSelector } from "react-redux";
import { markUserAsOffline , markUserAsOnline} from "../slice/auth/authSlice";
import { useEffect } from "react";
const HeaderBar = () => {
    const userInfo = localStorage.getItem('user');
    const parsedUserInfo = JSON.parse(userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectorData = useSelector((state)=> state.authData);
    console.log("selectorData + " + JSON.stringify(selectorData.userProfile))
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear();
        console.log("test")
        navigate("/")
        window.location.href="/";
                client.deactivate();
    }
    const handleOnlineToggle = () => {
        selectorData?.userProfile?.isOnline
        ?
        dispatch(markUserAsOffline())
        
        :dispatch(markUserAsOnline())

    }
    const handleHomeButton = (e) => {
        e.preventDefault()

        navigate("/")

    }
    useEffect(()=>{

    },[dispatch])
    return (
        < div style={{ display: 'flex', justifyContent: 'space-around' }}
        >          
          <Button onClick={(e) => handleHomeButton(e)}>Home</Button>

            <h1>{parsedUserInfo?.displayName}</h1>
            <Button onClick={(e) => handleOnlineToggle(e)}> {!selectorData?.userProfile?.isOnline ? "Go Online" : "Go Offline"}</Button>
            <Button onClick={(e) => handleLogout(e)}>Logout</Button>
        </div>

    )

}
export default HeaderBar;
