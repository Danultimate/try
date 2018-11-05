import axios from "axios";

export default axios.create({
    //baseURL: 'https://localhost:5000/api',
    baseURL: 'https://seller-server-dev.herokuapp.com/api',
    // headers: {'common': {'Authorization': `Bearer ${getToken.done()}`}},
});

// import fetch from 'react-native';

// fetch('https://seller-server-dev.herokuapp.com/api', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     firstParam: 'yourValue',
//     secondParam: 'yourOtherValue',
//   }),
// });