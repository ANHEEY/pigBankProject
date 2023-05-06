import axios from 'axios';   // npm install axios

axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post["Content-type"] = 'application/json'


// 로그인이 완료시 JWT를 저장한다.

export const getAuthToken = () => {
    return window.localStorage.getItem("token");
}

export const setAuthToken = (token) => {
   window.localStorage.setItem("token", token);
}

export const setId=(id) =>{
    window.localStorage.setItem("id",id);
}

export const getId=()=>{
    return window.localStorage.getItem("id");
}


export const request = (method, url, data) => {

    // 주석처리하고 Login.js에서 구현
    //let headers = {};

    // if(getAuthToken() !== null && getAuthToken !=="null") {
    //     //headers = {"Authorization": `Bearer ${getAuthToken()}`};
    //     headers = {"Authorization": 'Bearer ${getAuthToken()}'};
    //     console.log('headers : ', headers);
    // }
    // if (getAuthToken() !== null && getAuthToken() !== "null") {
    //     headers = { Authorization: 'Bearer ${getAuthToken()}' };
    // }
    
    console.log('axios~~~');
    //console.log('headers : ', headers);
    console.log('method : ', method );
    console.log('url : ', url );
    console.log('data : ', data );
    


    return axios({
        method: method,
        //headers: headers,
        url: url,
        data: data
    });
};

