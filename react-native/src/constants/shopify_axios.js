import axios from "axios";

export default axios.create({
    baseURL: 'https://descubre-belleza.myshopify.com/admin',
    headers: {'common': {'Authorization': 'Basic MDJjZmM3MTQ4MmU2NTUyMzc4YmM3ZDExZTM4ODViZDY6ZTdiOWNmNmRlNDAxZjU2ZTQ3YzVkNmUyZjJjOTI1MTE='}},
});