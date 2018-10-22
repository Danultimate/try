import Colors from "../../../native-base-theme/variables/commonColor";

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: Colors.brandPrimary },
    titleStyle: {
      color: Colors.titleFontColor,
      alignSelf: "center",
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase
    },
    backButtonTintColor: Colors.textColor
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
