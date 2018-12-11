import axios from "axios";
import Config from './config';

export default axios.create({
    //baseURL: 'https://localhost:5000/api',
    baseURL: Config.baseURL,
    // headers: {'common': {'Authorization': `Bearer ${getToken.done()}`}},
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
});