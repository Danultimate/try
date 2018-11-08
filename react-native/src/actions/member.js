import ErrorMessages from "../constants/errors";
import statusMessage from "./status";
import { AsyncStorage } from "react-native";
import { Firebase, FirebaseRef } from "../lib/firebase";
import axios from "axios";
import API from "../constants/api";
import { Actions } from "react-native-router-flux";
import publicAPI from "../constants/api_public";

/**
 * Sign Up to Firebase and Backend
 */
export function signUp(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    cellphone,
    referred_by, //optional
    checked
  } = formData;

  return dispatch =>
    new Promise(async (resolve, reject) => {
      // Validation checks
      if (!firstName)
        return reject({ message: ErrorMessages.missingFirstName });
      if (!lastName) return reject({ message: ErrorMessages.missingLastName });
      if (!cellphone)
        return reject({ message: ErrorMessages.missingCellphone });
      if (!email) return reject({ message: ErrorMessages.missingEmail });
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!password2) return reject({ message: ErrorMessages.missingPassword });
      if (password !== password2)
        return reject({ message: ErrorMessages.passwordsDontMatch });
      if (!checked) return reject({ message: ErrorMessages.missingTandC });

      // Check already descubre account
      publicAPI
        .post("/already_user", JSON.stringify({ cellphone: cellphone }), {
          headers: { common: {} }
        })
        .then(response => {
          console.log("el is_user", response.data.is_user);
          if (response.data.is_user)
            return reject({ message: ErrorMessages.existingCellphone });
        })
        .catch(error =>
          console.log("Error @check already descubre account " + error)
        );

      await statusMessage(dispatch, "loading", true);

      // Go to Firebase
      return Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          // Send user details to Firebase database
          if (res && res.user.uid) {
            FirebaseRef.child(`users/${res.user.uid}`)
              .set({
                firstName,
                lastName,
                phoneNumber: cellphone,
                signedUp: Firebase.database.ServerValue.TIMESTAMP,
                lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP
              })
              .then(() => {
                // Send user details to Flask DB
                axios
                  .post("https://seller-server-dev.herokuapp.com/api/sign_up", {
                    sign_up: {
                      first_name: firstName,
                      last_name: lastName,
                      cellphone: cellphone,
                      password: password,
                      email: email,
                      commission: 0.3,
                      referred_by_code: referred_by
                    }
                  })
                  .then(async response => {
                    console.log("user and seller registered");
                    console.log(response.data);
                  })
                  .catch(error => console.log(error));

                statusMessage(dispatch, "loading", false).then(resolve);
              });
          }
        })
        .catch(reject);
    }).catch(async err => {
      await statusMessage(dispatch, "loading", false);
      if (err.code === "auth/email-already-in-use") {
        throw ErrorMessages.existingEmail;
      } else if (err.code === "auth/invalid-email") {
        throw ErrorMessages.invalidEmail;
      } else {
        throw err.message;
      }
      console.log(err.code);
      throw err.message;
    });
}

/**
 * Get this User's Details from Firebase
 */
function getUserData(dispatch) {
  const UID =
    FirebaseRef &&
    Firebase &&
    Firebase.auth() &&
    Firebase.auth().currentUser &&
    Firebase.auth().currentUser.uid
      ? Firebase.auth().currentUser.uid
      : null;

  if (!UID) return false;

  const ref = FirebaseRef.child(`users/${UID}`);

  return ref.on("value", snapshot => {
    const userData = snapshot.val() || [];

    // Get data from backend
    console.log("getSellerData");
    API.defaults.headers.common = {};
    getToken().then(token => {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Get user backend data
      API.get("/sellers").then(seller => {
        console.log("getSellerData succeed");
        //console.log(seller.data.sellers)
        API.get("/orders").then(orders => {
          console.log("getOrdersData succeed");
          //console.log(orders.data)
          API.get("/clients_react").then(clients => {
            console.log("getClientsData succeed");
            //console.log(clients.data)
            return dispatch({
              type: "USER_DETAILS_UPDATE",
              data: userData,
              dataSeller: seller.data.sellers[0],
              dataValidOrders: seller.data.orders,
              dataOrders: orders.data.orders,
              dataClients: clients.data.clients
            });
          });
        });
      });
    });
  });
}

// TODO: Integrate with dispatch etc

async function getToken() {
  return (await AsyncStorage.getItem("token")) || "none";
}

/**
 * Get this User's Details from Backend
 */
export function setupAxios(dispatch, cellphone, password) {
  AsyncStorage.removeItem("token");
  publicAPI.defaults.headers.common = {};
  return publicAPI
    .post("/login", {
      username: cellphone,
      password: password
    })
    .then(response => {
      console.log("el token");
      console.log(response.data.access_token);
      AsyncStorage.setItem("token", response.data.access_token).then(res => {
        console.log("set the token");
        console.log(res);
        console.log(response.data.access_token);
        API.defaults.headers.common["Authorization"] = `Bearer ${
          response.data.access_token
        }`;
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        AsyncStorage.getItem("notificationToken").then(notificationToken => {
          console.log("El notiification token");
          console.log(notificationToken);
          API.put(`/users/${response.data.user.id}`, {
            user: { device_token: notificationToken }
          });
        });
        console.log("@auth-backend success");
        getUserData(dispatch);
      });
    })
    .catch(async err => {
      console.log("Error @auth-backend");
      console.log(err);
      await statusMessage(dispatch, "loading", false);
      throw ErrorMessages.wrongPassword;
      //return reject({ message: ErrorMessages.wrongPassword });
    });
}

export function getMemberData() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch =>
    new Promise(resolve => {
      Firebase.auth().onAuthStateChanged(loggedIn => {
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
  const { email, password, cellphone, userWithEmail, checked } = formData;
  return dispatch =>
    new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, "loading", true);
      // Validation checks
      if (!email) return reject({ message: ErrorMessages.missingEmail });
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!cellphone)
        return reject({ message: ErrorMessages.missingCellphone });
      if (!userWithEmail) {
        if (!checked) return reject({ message: ErrorMessages.missingTandC });
        // Update email at Backend
        publicAPI.defaults.headers.common = {};
        return publicAPI
          .post("https://seller-server-dev.herokuapp.com/api/login", {
            username: cellphone,
            password: password
          })
          .then(response => {
            let user_data = response.data.user;
            console.log("el user_id");
            console.log(user_data.id);
            publicAPI.defaults.headers.common["Authorization"] = `Bearer ${
              response.data.access_token
            }`;
            return publicAPI
              .put(
                `https://seller-server-dev.herokuapp.com/api/users/${
                  user_data.id
                }`,
                { user: { email: email } }
              )
              .then(async uppdatedUserRes => {
                console.log("entra al update del email");
                console.log(uppdatedUserRes.data);
                publicAPI.defaults.headers.common = {};
                // Sign up then login in Firebase
                // return dispatch => new Promise(async (resolve, reject) => {
                //   console.log('entra aca al signup only FB')

                //   await statusMessage(dispatch, 'loading', true);

                // Go to Firebase
                return Firebase.auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(res => {
                    console.log(res);
                    // Send user details to Firebase database

                    if (res && res.user.uid) {
                      FirebaseRef.child(`users/${res.user.uid}`)
                        .set({
                          firstName: user_data.first_name,
                          lastName: user_data.last_name,
                          phoneNumber: cellphone,
                          signedUp: Firebase.database.ServerValue.TIMESTAMP,
                          lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP
                        })
                        .then(async () => {
                          return await Firebase.auth()
                            .setPersistence(
                              Firebase.auth.Auth.Persistence.LOCAL
                            )
                            .then(() =>
                              Firebase.auth()
                                .signInWithEmailAndPassword(email, password)
                                .then(async res => {
                                  const userDetails =
                                    res && res.user ? res.user : null;

                                  if (userDetails.uid) {
                                    // Update last logged in data
                                    FirebaseRef.child(
                                      `users/${userDetails.uid}`
                                    ).update({
                                      lastLoggedIn:
                                        Firebase.database.ServerValue.TIMESTAMP
                                    });

                                    // Send verification Email when email hasn't been verified
                                    if (userDetails.emailVerified === false) {
                                      Firebase.auth()
                                        .currentUser.sendEmailVerification()
                                        .catch(() =>
                                          console.log(
                                            "Verification email failed to send"
                                          )
                                        );
                                    }

                                    // Set flask backend bridge
                                    await setupAxios(
                                      dispatch,
                                      cellphone,
                                      password
                                    );
                                    AsyncStorage.getItem("token").then(res => {
                                      console.log("here's the token");
                                      console.log(res);
                                    });

                                    // Get User Data
                                    //await getUserData(dispatch);
                                  }

                                  await statusMessage(
                                    dispatch,
                                    "loading",
                                    false
                                  );

                                  // Send Login data to Redux
                                  return resolve(
                                    dispatch({
                                      type: "USER_LOGIN",
                                      data: userDetails
                                    })
                                  );
                                })
                                .catch(reject)
                            );

                          // return statusMessage(dispatch, "loading", false).then(
                          //   resolve
                          // );
                        });
                    }
                    // }).catch(reject);
                  })
                  .catch(async err => {
                    await statusMessage(dispatch, "loading", false);
                    //throw ErrorMessages.wrongPassword;
                    return reject({ message: ErrorMessages.wrongPassword });
                  });
              });
          })
          .catch(async err => {
            console.log("error accaaaaa");
            await statusMessage(dispatch, "loading", false);
            //throw ErrorMessages.wrongPassword;
            return reject({ message: ErrorMessages.wrongPassword });
          });
      }

      // Go to Firebase
      return await Firebase.auth()
        .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
        .then(() =>
          Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(async res => {
              const userDetails = res && res.user ? res.user : null;

              if (userDetails.uid) {
                // Update last logged in data
                FirebaseRef.child(`users/${userDetails.uid}`).update({
                  lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP
                });

                // Send verification Email when email hasn't been verified
                if (userDetails.emailVerified === false) {
                  Firebase.auth()
                    .currentUser.sendEmailVerification()
                    .catch(() =>
                      console.log("Verification email failed to send")
                    );
                }

                // Set flask backend bridge
                await setupAxios(dispatch, cellphone, password);
                AsyncStorage.getItem("token").then(res => {
                  console.log("here's the token");
                  console.log(res);
                });

                // Get User Data
                //await getUserData(dispatch);
              }

              await statusMessage(dispatch, "loading", false);

              // Send Login data to Redux
              return resolve(
                dispatch({
                  type: "USER_LOGIN",
                  data: userDetails
                })
              );
            })
            .catch(reject)
        );
    }).catch(async err => {
      await statusMessage(dispatch, "loading", false);
      if (err.code === "auth/wrong-password") {
        throw ErrorMessages.wrongPassword;
      } else {
        throw err.message;
      }
    });
}

/**
 * Reset Password
 */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch =>
    new Promise(async (resolve, reject) => {
      // Validation checks
      if (!email) return reject({ message: ErrorMessages.missingEmail });

      await statusMessage(dispatch, "loading", true);

      // Go to Firebase
      return Firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() =>
          statusMessage(
            dispatch,
            "success",
            "Te hemos enviado un correo electrónico con un enlace para reestablecer tu contraseña"
          ).then(resolve(dispatch({ type: "USER_RESET" })))
        )
        .catch(reject);
    }).catch(async err => {
      await statusMessage(dispatch, "loading", false);
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
    changePassword
  } = formData;

  return dispatch =>
    new Promise(async (resolve, reject) => {
      // Are they a user?
      const UID = Firebase.auth().currentUser.uid;
      if (!UID) return reject({ message: ErrorMessages.missingFirstName });

      // Validation checks
      if (!firstName)
        return reject({ message: ErrorMessages.missingFirstName });
      if (!lastName) return reject({ message: ErrorMessages.missingLastName });
      if (changeEmail) {
        if (!email) return reject({ message: ErrorMessages.missingEmail });
      }
      if (changePassword) {
        if (!password)
          return reject({ message: ErrorMessages.missingPassword });
        if (!password2)
          return reject({ message: ErrorMessages.missingPassword });
        if (password !== password2)
          return reject({ message: ErrorMessages.passwordsDontMatch });
      }

      await statusMessage(dispatch, "loading", true);

      // Go to Firebase
      return FirebaseRef.child(`users/${UID}`)
        .update({ firstName, lastName })
        .then(async () => {
          // Update Email address
          if (changeEmail) {
            await Firebase.auth()
              .currentUser.updateEmail(email)
              .catch(reject);
          }

          // Change the password
          if (changePassword) {
            await Firebase.auth()
              .currentUser.updatePassword(password)
              .catch(reject);
          }

          // Update Redux
          await getUserData(dispatch);
          await statusMessage(dispatch, "loading", false);
          return resolve("Profile Updated");
        })
        .catch(reject);
    }).catch(async err => {
      await statusMessage(dispatch, "loading", false);
      throw err.message;
    });
}

/**
 * Logout
 */
export function logout() {
  return dispatch =>
    new Promise((resolve, reject) => {
      Firebase.auth()
        .signOut()
        .then(() => {
          API.defaults.headers.common = {};
          AsyncStorage.removeItem("token");
          dispatch({ type: "USER_RESET" });
          Actions.welcome({});
          setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
        })
        .catch(reject);
    }).catch(async err => {
      await statusMessage(dispatch, "error", err.message);
      throw err.message;
    });
}
