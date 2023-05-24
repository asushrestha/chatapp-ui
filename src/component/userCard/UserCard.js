import { Typography, Button, Card, CardContent, CardActions } from "@material-ui/core";
import useStyles from './style';
import moment from 'moment';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import PanoramaFishEyeSharpIcon from '@mui/icons-material/PanoramaFishEyeSharp';
import { useDispatch } from "react-redux";
import { createChatRoom } from '../../slice/chatRoom/roomSlice'
import { Navigate, useNavigate } from "react-router-dom";
const UserCard = (userData) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const classes = useStyles();
    const user = userData.user;
    const handleGoToChatRoom = (id) => {
        console.log(id)
        const token = localStorage.getItem("userToken");
        console.log(token)
        if (token) {
            dispatch(createChatRoom({ token, id }))
                .unwrap()
                .then((response) => {
                    console.log(response)
                    console.log(response.chatRoomInfo.chatRoomId)
                    navigate("/list-room/"+ response.chatRoomInfo.chatRoomId);
                })
                .catch((error) => {
                    console.log(error)
                });
        }

    }
    return (
        <Card className={classes.card}>
            <div className={classes.overlay}>
                <Typography variant="body2">Member since: {moment(user.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2} >
                <Button style={{ color: 'white' }} size="small" onClick={() => { }}>
                </Button>
            </div>

            <div className={classes.details}>
            </div>
            <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom>{user.displayName ? user.displayName : "No Name"}</Typography>
                <Typography variant="body2" display="block" align='left' >@{user.userName}</Typography>

            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => { handleGoToChatRoom(user.id) }}>
                    {/* <ThumbUpAltIcon fontSize="small"/> */}
                    {user.isOnline ? <CircleSharpIcon /> : <PanoramaFishEyeSharpIcon />}
                    Go to the chat room
                </Button>
                
            </CardActions>
        </Card>
    );

}

export default UserCard;