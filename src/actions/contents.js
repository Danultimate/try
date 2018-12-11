import { Firebase, FirebaseRef } from "../lib/firebase";
import AsyncStorage from "react-native";
import shopify from "../constants/shopify";
import API from "../constants/api";

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch =>
    new Promise(resolve =>
      resolve(
        dispatch({
          type: "RECIPES_ERROR",
          data: message
        })
      )
    );
}

/**
 * Get Collections
 */
export function getContents() {
  return dispatch => AsyncStorage.getItem("token")
  .then(token => {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    API.get("/feed")
      .then(response => {
        console.log("Retrieve Feed");
        console.log(response.data.feed[0].type);
        return resolve(
          dispatch({
            type: "CONTENTS_REPLACE",
            feed: response.data.feed,
            products: response.data.products,
            orders: response.data.orders,
            headerMessage: response.data.header_message
          })
        );
      })
    });
  // return dispatch =>
  //   new Promise((resolve, reject) =>
  //     AsyncStorage.getItem("token")
  //       .then(token => {
  //         API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //         API.get("/feed")
  //           .then(response => {
  //             console.log("Retrieve Feed");
  //             console.log(response.data.feed[0].type);
  //             return resolve(
  //               dispatch({
  //                 type: "CONTENTS_REPLACE",
  //                 feed: response.data.feed,
  //                 products: response.data.products,
  //                 orders: response.data.orders,
  //                 headerMessage: response.data.header_message
  //               })
  //             );
  //           })
  //           .catch(reject);
  //       })
  //       .catch(error => {
  //         console.log("Error @fetching collections");
  //         console.log(error);
  //         return [];
  //       })
  //   ).catch(error => {
  //     console.log("Error @fetching collections");
  //     console.log(error);
  //     return [];
  //   });
}
