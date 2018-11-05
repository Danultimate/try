import axios from "axios";

export default axios.create({
    //baseURL: 'https://localhost:5000/api',
    baseURL: 'https://seller-server-dev.herokuapp.com/api',
});
