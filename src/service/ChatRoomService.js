import axios from "axios";
const API_URL = "http://127.0.0.1:8080/chatapp/v1/users/chat-room/"
const createChatRoomIfNotExists = async (token,id ) => {
    let data =JSON.stringify({
        participantTwoId: id
    });
    let config ={
        method: 'post',
        url: API_URL + "create",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
        data:data
    }
    const response = await axios.request(config)
        .then((response) => {
            console.log(response)
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
        return response
    
};
const fetchMessagesByChatRoomId = async (token,id ) => {
    let config ={
        method: 'get',
        url: API_URL + "get"+"?chatRoomId="+id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
    }
    const response = await axios.request(config)
        .then((response) => {
            console.log("this response"+ JSON.stringify(response.data))
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
        return response
    
};
const fetchChatHeadList = async (token ) => {
    let config ={
        method: 'get',
        url: API_URL ,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
    }
    const response = await axios.request(config)
        .then((response) => {
            console.log("response of chat head" + JSON.stringify(response.data))
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
        return response
    
};

const chatRoomService ={
    createChatRoomIfNotExists,
    fetchMessagesByChatRoomId,
    fetchChatHeadList
}
export default chatRoomService;