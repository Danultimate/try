import { AsyncStorage } from "react-native";
import API from "../constants/api"; 

async function getToken() {
    return (await AsyncStorage.getItem("token")) || "none";
  }

/**
 * Get this User's Details from Firebase
 */
function getUserOrderData(dispatch) {
  return () => {
    // Get data from backend
    console.log("getOrderData update");
    API.defaults.headers.common = {};
    getToken().then(token => {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/orders").then(orders => {
        console.log("getOrdersData succeed");
        //console.log(orders.data)
          //console.log(clients.data)
          return dispatch({
            type: "USER_ORDERS_UPDATE",
            dataOrders: orders.data.orders
          });
      });
    });
    };
}

export function getOrderData() {  
    console.log('entra aqui at least')
    return dispatch =>
        {console.log("getOrderData update");
        API.defaults.headers.common = {};
        getToken().then(token => {
          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
          API.get("/orders").then(orders => {
            console.log("getOrdersData succeed");
            //console.log(orders.data)
              //console.log(clients.data)
              return dispatch({
                type: "USER_ORDERS_UPDATE",
                dataOrders: orders.data.orders
              });
          });
        });}
              
  }