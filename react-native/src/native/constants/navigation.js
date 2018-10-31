import Colors from "../../../native-base-theme/variables/commonColor";

export default {
  navbarProps: {
    navigationBarStyle: {
      backgroundColor: Colors.brandPrimary,
      borderBottomColor: Colors.brandPrimary,
      elevation: 0
    },
    titleStyle: {
      color: Colors.titleFontColor,
      alignSelf: "center",
      fontFamily: "playfair",
      textAlign: "center",
      fontSize: Colors.fontSizeBase * 1.375,
      marginHorizontal: 0
    },
    backButtonTintColor: Colors.titleFontColor,
    backButtonTextStyle: { color: Colors.titleFontColor },
    leftButtonTextStyle: { color: Colors.titleFontColor }
  },

  tabProps: {
    swipeEnabled: false,
    activeBackgroundColor: "rgba(255,255,255,1)",
    inactiveTintColor: "#A492D1",
    activeTintColor: Colors.brandInfo,
    inactiveBackgroundColor: Colors.footerDefaultBg,
    tabBarStyle: { backgroundColor: Colors.tabBgColor }
  },

  icons: {
    style: { color: "#A492D1", height: 30, width: 30 }
  }
};
