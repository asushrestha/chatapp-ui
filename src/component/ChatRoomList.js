
import React, { useRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message.js";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { fetchMessagesByChatRoomId, unSubscribeThisRoomId,updateChatHeadList } from '../slice/chatRoom/roomSlice.js'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import ChatHeadList from "./ChatHeadList.js";
import StompService from "../config/StompConfig.js";
import { client } from "../config/StompConfig.js";
import { updateChatMessage } from "../slice/chatRoom/roomSlice.js";
import { StompConfig } from "../config/StompConfig.js";
const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            width: "80vw",
            height: "80vh",
            maxWidth: "500px",
            maxHeight: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        paper2: {
            width: "80vw",
            maxWidth: "500px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        container: {
            display: "flex",
            alignItems: "start",
            justifyContent: "center"
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )"
        }
    })
);

const ChatRoomList = () => {
    const [chatId, setChatId] = useState();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [chatMessage, setChatMessage] = useState([]);
    const { id } = useParams()
    const token = localStorage.getItem('userToken');
    const messagesEndRef = useRef(null);

    const createStompConnection = () => {
        StompService.StompConfig();
    }

    const fetchChatRoomMessage = (chatRoomId) => {

        dispatch(fetchMessagesByChatRoomId({ chatRoomId, token }))
            .unwrap()
            .then((response) => {
                setChatMessage(response);
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const userInfo = localStorage.getItem("user");
    const parsedUserInfo = JSON.parse(userInfo);
    const SetChatIDFunc = () => {
        dispatch(unSubscribeThisRoomId(chatId)).unwrap()
            .then((response) => console.log(response))
            .catch(err => console.log(err))
        setChatId(id);
        console.log(chatId)

    }
    useEffect(() => {
        if (chatId) {
            fetchChatRoomMessage(chatId);
        }
    }, [chatId]);

    useEffect(() => {
        SetChatIDFunc();
        console.log("change id:" + id)
    }, [id])
    useEffect(() => {
        createStompConnection();
    }, [])

    useEffect(() => {
        if (id) {
            if (!client.connected) {
                StompConfig();
            }
            try {
                console.log("test: here", id)
                client.onConnect = () => {
                    client.subscribe(
                        "/topic/queue/message/room/" + id, (response) => {
                            console.log("queue data + " + response.body)
                            dispatch(updateChatMessage(JSON.parse(response.body)))
                                .unwrap()
                                .then(response => console.log(response))
                                .catch(err => console.log(err));

                        },);
                    client.subscribe('/topic/queue/message/list/' + parsedUserInfo.id, (response) => {
                        console.log("subscribe + " + JSON.parse(response.body))
                        dispatch(updateChatHeadList(JSON.parse(response.body)))
                            .unwrap()
                            .then(response => console.log(response))
                            .catch(err => console.log(err));
                    });
                }
                client.subscribe(
                    "/topic/queue/message/room/" + id, (response) => {
                        console.log("queue data + " + response.body)
                        dispatch(updateChatMessage(JSON.parse(response.body)))
                            .unwrap()
                            .then(response => console.log(response))
                            .catch(err => console.log(err));

                    },);

            } catch (error) {
                console.log(error)
            }

        }
    }, [id])

  

    const selectordata = useSelector((state) => state.chatRoomInfo);
    console.log("selectordata" + selectordata)
    useEffect(() => {
        if (selectordata) {
            setChatMessage(selectordata)
        }
    }, [selectordata])



    const chatData = selectordata.length > 0 ? selectordata : chatMessage
    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [chatData]);

    return (
        <div className={classes.container}>
            <div >
                Chat Message Info
                <ChatHeadList setChatId={setChatId} chatId={chatId} />
            </div>
            <Paper className={classes.paper} zdepth={2 } >
                <Paper id="style-1" className={classes.messagesBody} >
                    {chatData?.chatMessageInfo?.map(data => {
                        return (
                            <>
                                {
                                    data?.sentBy?.id == parsedUserInfo?.id ?
                                        <div key={data.messageId}>
                                            <MessageRight message={data?.plainText} />
                                        </div>
                                        :
                                        <div key={data.messageId}>
                                            <MessageLeft displayName="Asmin" message={data?.plainText} />
                                        </div>
                                }
                            </>
                        )
                    })}
                            <div ref={messagesEndRef} />
                </Paper>
                <TextInput chatId={chatId} />
            </Paper>
        </div>
    );
}

export default ChatRoomList;