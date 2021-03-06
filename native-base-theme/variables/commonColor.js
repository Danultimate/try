import color from "color";

import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = "material";
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;

export default {
  platformStyle: "material",
  platform: "ios",
  androidRipple: true,
  androidRippleColor: "rgba(256, 256, 256, 0.3)",
  androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
  btnUppercaseAndroidText: true,
  badgeBg: "rgba(64,57,82,1)",
  badgeColor: "#fff",
  badgePadding: 3,
  btnFontFamily: "System",
  btnDisabledBg: "#E6DCFF",
  buttonPadding: 6,
  btnPrimaryBg: "#5B2AD0",
  btnPrimaryColor: "#fff",
  btnInfoBg: "rgba(0,137,255,1)",
  btnInfoColor: "#fff",
  btnSuccessBg: "#00CC8B",
  btnSuccessColor: "#fff",
  btnDangerBg: "rgba(255,0,167,1)",
  btnDangerColor: "#fff",
  btnWarningBg: "rgba(255,170,0,1)",
  btnWarningColor: "#fff",
  btnTextSize: 18,
  btnTextSizeLarge: 22.5,
  btnTextSizeSmall: 12,
  borderRadiusLarge: 57,
  iconSizeLarge: 45,
  iconSizeSmall: 18,
  cardDefaultBg: "#fff",
  cardBorderColor: "#EBEDF0",
  CheckboxRadius: 4,
  CheckboxBorderWidth: 2,
  CheckboxPaddingLeft: 2,
  CheckboxPaddingBottom: 0,
  CheckboxIconSize: 18,
  CheckboxFontSize: 19,
  DefaultFontSize: 18,
  checkboxBgColor: "rgba(0,137,255,1)",
  checkboxSize: 20,
  checkboxTickColor: "#fff",
  brandPrimary: "#5b2ad0",
  brandInfo: "#0089FF",
  brandSuccess: "#00CC8B",
  brandDanger: "#FF00A7",
  brandWarning: "#FF6A00",
  brandDark: "rgba(91,42,208,1)",
  brandLight: "#FBFAFF",
  fontFamily: "System",
  fontSizeBase: 16,
  fontSizeH1: 32,
  fontSizeH2: 24,
  fontSizeH3: 20,
  footerHeight: 64,
  footerDefaultBg: "rgba(251,250,255,1)",
  footerPaddingBottom: 0,
  tabBarTextColor: "rgba(164,146,209,1)",
  tabBarTextSize: 14,
  activeTab: "#fff",
  sTabBarActiveTextColor: "rgba(0,137,255,1)",
  tabBarActiveTextColor: "rgba(0,137,255,1)",
  tabActiveBgColor: "rgba(255,255,255,1)",
  toolbarBtnColor: "#fff",
  toolbarDefaultBg: "rgba(91,42,208,1)",
  toolbarHeight: 80,
  toolbarSearchIconSize: 20,
  toolbarInputColor: "#fff",
  searchBarHeight: 30,
  searchBarInputHeight: 30,
  toolbarBtnTextColor: "#fff",
  toolbarDefaultBorder: "rgba(74,33,172,1)",
  iosStatusbar: "light-content",
  statusBarColor: "#32408F",
  darkenHeader: "#F0F0F0",
  iconFamily: "SimpleLineIcons",
  iconFontSize: 24,
  iconHeaderSize: 29,
  inputFontSize: 17,
  inputBorderColor: "rgba(200,179,255,1)",
  inputSuccessBorderColor: "rgba(0,204,139,1)",
  inputErrorBorderColor: "rgba(255,0,167,1)",
  inputHeightBase: 50,
  inputColor: "rgba(91,42,208,1)",
  inputColorPlaceholder: "rgba(164,146,209,1)",
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  lineHeight: 24,
  listBg: "rgba(255,255,255,1)",
  listBorderColor: "rgba(164,146,209,1)",
  listDividerBg: "rgba(241,236,255,1)",
  listBtnUnderlayColor: "#DDD",
  listItemPadding: 16,
  listNoteColor: "rgba(164,146,209,1)",
  listNoteSize: 13,
  defaultProgressColor: "#E4202D",
  inverseProgressColor: "#1A191B",
  radioBtnSize: 25,
  radioSelectedColorAndroid: "#5067FF",
  radioBtnLineHeight: 29,
  radioColor: "rgba(91,42,208,1)",
  segmentBackgroundColor: "rgba(91,42,208,1)",
  segmentActiveBackgroundColor: "#fff",
  segmentTextColor: "#fff",
  segmentActiveTextColor: "rgba(91,42,208,1)",
  segmentBorderColor: "#fff",
  segmentBorderColorMain: "#3F51B5",
  defaultSpinnerColor: "rgba(0,204,139,1)",
  inverseSpinnerColor: "rgba(64,57,82,1)",
  tabDefaultBg: "rgba(81,35,191,1)",
  topTabBarTextColor: "rgba(164,146,209,1)",
  topTabBarActiveTextColor: "#fff",
  topTabBarBorderColor: "#fff",
  topTabBarActiveBorderColor: "#fff",
  tabBgColor: "#F8F8F8",
  tabFontSize: 15,
  textColor: "rgba(64,57,82,1)",
  inverseTextColor: "#fff",
  noteFontSize: 14,
  defaultTextColor: "#403952",
  titleFontfamily: "System",
  titleFontSize: 18,
  subTitleFontSize: 14,
  subtitleColor: "#FFF",
  titleFontColor: "#FFF",
  borderRadiusBase: 3,
  borderWidth: 1,
  contentPadding: 10,
  dropdownLinkColor: "rgba(91,42,208,1)",
  inputLineHeight: 24,
  deviceWidth: 1280,
  deviceHeight: 699,
  isIphoneX: false,
  inputGroupRoundedBorderRadius: 30
};
