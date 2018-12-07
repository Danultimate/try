import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from "react-native";
import API from '../constants/api';

export default async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  AsyncStorage.setItem('notificationToken', token)
    .then(() => {
      console.log('el token de expo!')
      console.log(token)
    })
  
  // let tokenFCM = await Notifications.getDevicePushTokenAsync();
  // AsyncStorage.setItem('notificationTokenFCM', tokenFCM)
  //   .then(() => {
  //     console.log('el token de FCM!')
  //     console.log(tokenFCM)
  //   })
  
  // const { data: tokenFCM, type: platform } = await Notifications.getDevicePushTokenAsync();
  // console.log(data)
  // alert(data);
  // alert(type);

  //return API.put(`/users/${response.data.user.id}`, { user: {device_token: notificationToken }})
  return [];

}