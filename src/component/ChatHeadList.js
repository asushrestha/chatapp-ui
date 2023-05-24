import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { fetchChatHeadList } from '../slice/chatRoom/roomSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const ChatHeadList = ({ setChatId, chatId }) => {
    const [chatHeadList, setChatHeadList] = useState([])
    const dispatch = useDispatch()

    const handleFetchChatHeadList = () => {
        dispatch(fetchChatHeadList()).unwrap().then((response) => {
            setChatHeadList(response);
        }).catch((err) => { console.log(err) })
    }
    const chatHeadListArray = chatHeadList?.chatHeadList;

    React.useEffect(() => {
        handleFetchChatHeadList();
    }, [])
    const selectordata = useSelector((state) => state.chatRoomInfo);
    React.useEffect(()=>{
        if (selectordata) {
            setChatHeadList(selectordata)
        }
    },[selectordata])
    const history = useNavigate()
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {chatHeadListArray?.map(data =>
                <ListItem onClick={() => {
                    history(`/list-room/${data.chatRoomId}`)
                    setChatId(data.chatRoomId)
                }
                }
                    alignItems="flex-start" key={data.chatRoomId} style={{ backgroundColor: chatId == data.chatRoomId ? "grey" : "white" }} >
                    <ListItemAvatar>
                        <Avatar alt={data?.otherUserProfile?.displayName} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={data?.otherUserProfile?.displayName}
                        secondary={
                            <React.Fragment>
                                {data?.lastMessage}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            )}

        </List>
    );

}

export default ChatHeadList;