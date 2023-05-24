import axios from "axios";

const API_URL = "http://127.0.0.1:8080/chatapp/v1/users/";

const register = (userName, displayName, password) => {
    return axios.post(API_URL + "register-new", {
        userName,
        displayName,
        password,
    });
};
const login = async (userName, password) => {
    console.log("eta1" + userName + password)
    let data = JSON.stringify({
        userName,
        password
    });
    let config = {
        method: 'post',
        url: API_URL + "authenticate",
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    console.log(config)
    const response = await axios.request(config)
        .then((response) => {
            if (response?.data?.token) {
                localStorage.setItem("user", JSON.stringify(response.data?.userProfile));
                localStorage.setItem("userToken", JSON.stringify(response.data.token));
            }
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
        return response;
    
};


const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
};
const markUserAsOnline = async (token ) => {
    console.log("inside service: token is "+ token)
    const data ={
        confirmationText:"ok"
    }
    const config = {
        method: 'put',
        url: API_URL + "mark-as-online",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
        data:data
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

const markUserAsOffline = async (token ) => {
    const data ={
        confirmationText:"ok"
    }
console.log(token)
    const config = {
        method: 'put',
        url: API_URL + "mark-as-offline",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
        data:data
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
const getUserProfile = async (token ) => {
    console.log("reached profile api")
    console.log(token)
    const config = {
        method: 'get',
        url: API_URL + "get-profile",
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
const authService = {
    register,
    login,
    logout,
    markUserAsOffline,
    markUserAsOnline,
    getUserProfile
};

export default authService;