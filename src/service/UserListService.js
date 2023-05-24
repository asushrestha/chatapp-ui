import axios from "axios";
const API_URL = "http://127.0.0.1:8080/chatapp/v1/users/"

const fetchUserList = async ( ) => {
const token = localStorage.getItem("userToken")
console.log(token)
    const config = {
        method: 'get',
        url: API_URL + "list-all",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
    };

    const response = await axios.request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
        return response;
    
};

const userListService ={
    fetchUserList,
    
}
export default userListService;