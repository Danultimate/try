import { Firebase, FirebaseRef } from '../lib/firebase';
import shopify from '../constants/shopify';
import shopifyAPI from '../constants/shopify_axios';
import {decode as atob} from 'base-64'

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}
export function getWhatsappMessages(collections){
  dataMessages = []
  collections.forEach((collection) => {
    id_number = atob(collection.id).split("/")[4]

    shopifyAPI.get(`/collections/${id_number}/metafields.json`)
    .then((metafields) => {
      metafields.data.metafields.forEach((metafield) => {

        let message = "Mira este contenido para ti";
        if (metafield.key == "wp_message"){
          message = metafield.value;
        }
        
        dataMessages.push(message)
      })
    })
  });
  console.log(dataMessages)
  return dataMessages;
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
  
  return dispatch => new Promise(async (resolve, reject) => shopify.collection
      .fetchQuery(collectionQuery)
      .then((collections) => {
        let dataMessages = getWhatsappMessages(collections);
        return resolve(dispatch({
          type: 'CONTENTS_REPLACE',
          data: collections,
          dataMessages: dataMessages,
        }));
      })
      .catch(error => {
          // this.setState({ error, isLoading: false })
          console.log('Error @fetching collections')
          console.log(error)
          return [];
      }));

}



/**
  * Get Contents
  */
 export function getContents() {
  return getCollections();

}
