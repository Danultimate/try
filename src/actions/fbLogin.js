
export async function fbLogin() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "187940432084793",
    {
      permissions: [
        "public_profile",
        "email"
        // "user_location",
        // "user_birthday"
      ]
    }
  );
  if (type === "success") {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
  }
}
