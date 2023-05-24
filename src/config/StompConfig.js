import { Client } from '@stomp/stompjs';
import {updateChatMessage }from '../slice/chatRoom/roomSlice' 
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const SOCKET_URL = "ws://127.0.0.1:8080/chatapp/v1/users"


// const [messages, setMessages] = useState([]);
const Authorization = "Bearer " + JSON.parse(localStorage.getItem("userToken"))

const userInfo = localStorage.getItem('user')
const parsedUserInfo = JSON.parse(userInfo)

const onDisconnected = () => {
    console.log("Disconnected!!")
}
const onConnected = () => {
    console.log("Connected!!")
    client.subscribe('/topic/queue/message/list/' + parsedUserInfo.id, (response) => {
        console.log("subscribe + " + JSON.stringify(response.body))
        return response;
    });
}

export const client = new Client({
    brokerURL: SOCKET_URL,
    reconnectDelay: 5000,
    heartbeatIncoming: 5000,
    heartbeatOutgoing: 5000,
    onConnect: onConnected,
    onDisconnect: onDisconnected,
    connectHeaders: Authorization,

});


export const StompConfig = () => {
    const runThis = () => {
    
        client.activate();

    };
        runThis();
    
}
const sendMessageInSocket = ({ chatId, plainText }) => {
    try {
        if (!client.connected) {
            StompConfig();
        }
        const payload = {
            plainText: plainText,
            chatRoomId: chatId
        }
        client.publish({ destination: "/app/send", headers: { Authorization }, body: JSON.stringify(payload) });
    
    } catch (err) {
        console.log(err)
    }

}

const unSubscribeThisRoomId = (chatId) => {
    if (!client.connected) {
        StompConfig();
    }
    try {
        client.onConnect = () => {
            client.unsubscribe(
                `/topic/queue/message/room/${chatId}`, (response) => {
                   console.log(response)
                });
        }

    } catch (err) {
        console.log(err)
    }
}

const StompService = {
    sendMessageInSocket,
    StompConfig,
    unSubscribeThisRoomId
}

export default StompService;    