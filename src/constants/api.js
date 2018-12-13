import axios from "axios";
import Config from './config';

export default axios.create({
    //baseURL: 'https://localhost:5000/api',
    baseURL: Config.baseURL,
});
