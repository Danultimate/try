import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { AsyncStorage } from "react-native";
import { Firebase, FirebaseRef } from '../lib/firebase';
import axios from "axios";
import API from '../constants/api';

/**
  * Sign Up to Firebase
  */
export function signUp(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    cellphone,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (!cellphone) return reject({ message: ErrorMessages.missingCellphone });
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!password2) return reject({ message: ErrorMessages.missingPassword });
    if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // Send user details to Firebase database
        if (res && res.user.uid) {
          FirebaseRef.child(`users/${res.user.uid}`).set({
            firstName,
            lastName,
            phoneNumber: cellphone,
            signedUp: Firebase.database.ServerValue.TIMESTAMP,
            lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
          }).then(() => statusMessage(dispatch, 'loading', false).then(resolve));
        }
      }).catch(reject);
  }).catch(async (err) => {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });
}

/**
  * Get this User's Details from Firebase
  */
function getUserData(dispatch) {
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;

  const ref = FirebaseRef.child(`users/${UID}`);

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];
    
    // Get data from backend
    console.log('getSellerData')
    getToken().then((token)=> {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;    

    // Get user backend data
    API.get('/sellers')
      .then((seller)=>{ 
        console.log('getSellerData succeed');
        //console.log(seller.data)
        API.get('/orders')
        .then((orders)=>{ 
          console.log('getOrdersData succeed')
          //console.log(orders.data)
          API.get('/clients_react')
          .then((clients)=>{ 
            console.log('getClientsData succeed')
            //console.log(clients.data)
            return dispatch({
              type: 'USER_DETAILS_UPDATE',
              data: userData,
              dataSeller: seller.data.sellers,
              dataOrders: orders.data.orders,
              dataClients: clients.data.clients,
            });

          })
        })
      })


      
    })
  });
}

// TODO: Integrate with dispatch etc

async function getToken(){
  return await AsyncStorage.getItem('token') || 'none'
}

/**
  * Get this User's Details from Backend
  * TODO: there's a lot todo here, not working
  */
export function setupAxios(cellphone) {
  console.log(cellphone)
  axios.post('https://seller-server-dev.herokuapp.com/api/login_admin', {
    username: cellphone,
    password: ' '
  })
  .then((response)=>{
    async () => {
      try {
        await AsyncStorage.setItem('token', response.data.access_token);
      } catch (error) {
        console.log('Error @auth-backend saving token')
      }
    }
    //API.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    console.log('@auth-backend success')
  })
  .catch((res)=>{
    console.log('Error @auth-backend')
    console.log(res)
  })
}

export function getMemberData() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(getUserData(dispatch));
      }

      return () => new Promise(() => resolve());
    });
  });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {
  const {
    email,
    password,
    cellphone,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!cellphone) return reject({ message: ErrorMessages.missingCellphone });

    // Go to Firebase
    return Firebase.auth()
      .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
      .then(() => Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          const userDetails = res && res.user ? res.user : null;

          if (userDetails.uid) {
            // Update last logged in data
            FirebaseRef.child(`users/${userDetails.uid}`).update({
              lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
            });

            // Send verification Email when email hasn't been verified
            if (userDetails.emailVerified === false) {
              Firebase.auth().currentUser
                .sendEmailVerification()
                .catch(() => console.log('Verification email failed to send'));
            }

            // Set flask backend bridge
            setupAxios(cellphone);

            // Get User Data
            getUserData(dispatch);
            
          }          

          await statusMessage(dispatch, 'loading', false);

          // Send Login data to Redux
          return resolve(dispatch({
            type: 'USER_LOGIN',
            data: userDetails,
          }));
        }).catch(reject));
  }).catch(async (err) => {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });
}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => statusMessage(dispatch, 'success', 'We have emailed you a reset link').then(resolve(dispatch({ type: 'USER_RESET' }))))
      .catch(reject);
  }).catch(async (err) => {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });

    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (changeEmail) {
      if (!email) return reject({ message: ErrorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!password2) return reject({ message: ErrorMessages.missingPassword });
      if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
    }

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return FirebaseRef.child(`users/${UID}`).update({ firstName, lastName })
      .then(async () => {
        // Update Email address
        if (changeEmail) {
          await Firebase.auth().currentUser.updateEmail(email).catch(reject);
        }

        // Change the password
        if (changePassword) {
          await Firebase.auth().currentUser.updatePassword(password).catch(reject);
        }

        // Update Redux
        await getUserData(dispatch);
        await statusMessage(dispatch, 'loading', false);
        return resolve('Profile Updated');
      }).catch(reject);
  }).catch(async (err) => {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise((resolve, reject) => {
    Firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'USER_RESET' });
        setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}
