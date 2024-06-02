import axios from "axios";
const baseURL = "http://localhost:3001/";
const $host = axios.create({
    baseURL:baseURL
});

const $authHost = axios.create({
    baseURL:baseURL
});

const authIntercepter = (config:any)=>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authIntercepter);

export{
    $host,
    $authHost
};