import axios from "axios";

export const ConnectURL = "http://localhost:8080/"

export default axios.create({
    baseURL: ConnectURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-type": "application/json",
    }
});
