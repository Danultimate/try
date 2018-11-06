import { Firebase, FirebaseRef } from "../lib/firebase";
import shopify from "../constants/shopify";



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
export function getCollections() {
  //Fill the query fields
  const collectionQuery = {
    first: 3,
    reverse: true
  };

  if (shopify === null) return () => new Promise(resolve => resolve());

  return dispatch =>
    new Promise((resolve, reject) =>
      shopify.collection
        .fetchQuery(collectionQuery)
        .then(collections => {
          
          //let dataMessages = getWhatsappMessages(collections);

          // Get collection's products          
          shopify.product
          .fetchQuery({
                        first: 5,
                        query: "tag:['diciembre']"
                      })
          .then(products => {
            return resolve(
              dispatch({
                type: "CONTENTS_REPLACE",
                data: collections,
                products: products,
                //dataMessages: dataMessages
              })
            );
          })
        })
        .catch(reject)
    ).catch(error => {
      console.log("Error @fetching collections");
      console.log(error);
      return [];
    });
}

/**
 * Get Contents
 */
export function getContents() {
  return getCollections();
}
