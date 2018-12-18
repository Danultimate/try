import React from "react";
import { Drawer, Scene, Tabs, Stack, Modal } from "react-native-router-flux";
import { View } from "react-native";
import Colors from "../../../native-base-theme/variables/commonColor";

import TabIcon from "../components/TabIcon";
import SearchIcon from "../components/SearchIcon";
import SearchButton from "../components/SearchButton";
import SearchInput from "../components/SearchInput";
import AppLogoComponent from "../components/AppLogo";

import DefaultProps from "../constants/navigation";
import AppConfig from "../../constants/config";

import SignUpContainer from "../../containers/SignUp";
import SignUpComponent from "../components/SignUp";

import LoginContainer from "../../containers/Login";
import LoginComponent from "../components/Login";

import ForgotPasswordContainer from "../../containers/ForgotPassword";
import ForgotPasswordComponent from "../components/ForgotPassword";

import LocaleContainer from "../../containers/Locale";
import LocaleComponent from "../components/Locale";

import UpdateProfileContainer from "../../containers/UpdateProfile";
import UpdateProfileComponent from "../components/UpdateProfile";

import BankInfoContainer from "../../containers/BankInfo";

import MemberContainer from "../../containers/Member";
import ProfileComponent from "../components/Profile";

import DashboardContainer from "../../containers/Dashboard";
import DashboardComponent from "../components/Dashboard";

import PreviewComponent from "../components/Preview";
import PreviewBlogComponent from "../components/PreviewBlog";
import PreviewProductComponent from "../components/PreviewProduct";
import SearchComponent from "../components/Search";
import FiltersComponent from "../components/Filters";

import WelcomeComponent from "../components/Welcome";
import OnboardingComponent from "../components/Onboarding";

import ProductsComponent from "../components/Products";
import ProductsGridComponent from "../components/ProductsGrid";
import OrdersComponent from "../components/Orders";
import OrderComponent from "../components/Order";
import ClientsComponent from "../components/Clients";
import ClientComponent from "../components/Client";

import ContactComponent from "../components/Contact";
import TermsComponent from "../components/Terms";
import SupportComponent from "../components/Support";
import AboutComponent from "../components/About";
import MoreComponent from "../components/More";
import SideMenu from "../components/SideMenu";
import PreviewStore from "../components/PreviewStore";

import FirstOrderModal from "../components/FirstOrderModal";
import PaymentInfoComponent from "../components/PaymentInfo";
import PaymentInfoAddComponent from "../components/PaymentInfoAdd";

const Index = (
  <Modal hideNavBar>
    <Stack key="root">
      <Scene hideNavBar>
        <Scene key="auth">
          <Scene key="welcome" hideNavBar component={WelcomeComponent} />

          <Scene
            key="signUp"
            hideNavBar
            title="Crea tu cuenta"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            key="login"
            hideNavBar
            title="Inicia sesión"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            key="forgotPassword"
            hideNavBar
            title="Reestablecer contraseña"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />

          <Scene
            renderRightButton={() => {
              return <View />;
            }}
            key="terms"
            title="Terminos y condiciones"
            {...DefaultProps.navbarProps}
            component={TermsComponent}
          />
          <Scene key="onboarding" hideNavBar component={OnboardingComponent} />
        </Scene>
        <Scene hideNavBar activeTintColor="#93a8d5" inactiveTintColor="#3b5998">
          <Tabs
            key="tabbar"
            swipeEnabled
            type="replace"
            {...DefaultProps.tabProps}
          >
            <Stack
              key="home"
              title="Inicio"
              iconName={"home"}
              icon={TabIcon}
              {...DefaultProps.navbarProps}
            >
              <Scene
                key="home"
                component={DashboardContainer}
                renderTitle={AppLogoComponent}
                renderLeftButton={() => {
                  return (
                    <View
                      style={{
                        width: 56
                      }}
                    />
                  );
                }}
                Layout={DashboardComponent}
                renderRightButton={SearchIcon}
                {...DefaultProps.navbarProps}
              />
            </Stack>

            <Stack
              key="products"
              title="Productos"
              iconName={"book-open"}
              icon={TabIcon}
              {...DefaultProps.navbarProps}
            >
              <Scene
                key="products"
                title="Productos"
                renderRightButton={() => {
                  return <SearchIcon dark />;
                }}
                {...DefaultProps.navbarProps}
                component={DashboardContainer}
                navigationBarStyle={{
                  backgroundColor: "#fff",
                  borderBottomColor: "#EEEDF2",
                  borderBottomWidth: 1,
                  elevation: 0
                }}
                Layout={ProductsComponent}
                backButtonTintColor={Colors.brandPrimary}
                backButtonTextStyle={{ color: Colors.brandPrimary }}
                leftButtonTextStyle={{ color: Colors.brandPrimary }}
                titleStyle={{
                  color: Colors.brandPrimary,
                  alignSelf: "center",
                  fontFamily: "playfair",
                  textAlign: "center",
                  fontSize: Colors.fontSizeBase * 1.375
                }}
              />
              <Scene
                key="productsGrid"
                title="Productos"
                renderRightButton={() => {
                  return <SearchIcon dark />;
                }}
                {...DefaultProps.navbarProps}
                component={ProductsGridComponent}
                navigationBarStyle={{
                  backgroundColor: "#fff",
                  borderBottomColor: "#EEEDF2",
                  borderBottomWidth: 1,
                  elevation: 0
                }}
                backButtonTintColor={Colors.brandPrimary}
                backButtonTextStyle={{ color: Colors.brandPrimary }}
                leftButtonTextStyle={{ color: Colors.brandPrimary }}
                titleStyle={{
                  color: Colors.brandPrimary,
                  alignSelf: "center",
                  fontFamily: "playfair",
                  textAlign: "center",
                  fontSize: Colors.fontSizeBase * 1.375
                }}
              />
            </Stack>

            <Stack
              key="orders"
              title="Ordenes"
              iconName={"basket-loaded"}
              icon={TabIcon}
              {...DefaultProps.navbarProps}
            >
              <Scene
                key="orders"
                title="Ordenes"
                component={DashboardContainer}
                Layout={OrdersComponent}
                {...DefaultProps.navbarProps}
                navigationBarStyle={{
                  backgroundColor: "#fff",
                  borderBottomColor: "#EEEDF2",
                  borderBottomWidth: 1,
                  elevation: 0
                }}
                backButtonTintColor={Colors.brandPrimary}
                backButtonTextStyle={{ color: Colors.brandPrimary }}
                leftButtonTextStyle={{ color: Colors.brandPrimary }}
                titleStyle={{
                  color: Colors.brandPrimary,
                  alignSelf: "center",
                  fontFamily: "playfair",
                  textAlign: "center",
                  fontSize: Colors.fontSizeBase * 1.375
                }}
              />
              <Scene
                key="order"
                title="Orden"
                component={OrderComponent}
                {...DefaultProps.navbarProps}
                navigationBarStyle={{
                  backgroundColor: "#fff",
                  borderBottomColor: "#fff",
                  elevation: 0
                }}
                backButtonTintColor={Colors.brandPrimary}
                backButtonTextStyle={{ color: Colors.brandPrimary }}
                leftButtonTextStyle={{ color: Colors.brandPrimary }}
                titleStyle={{
                  color: Colors.brandPrimary,
                  alignSelf: "center",
                  fontFamily: "playfair",
                  textAlign: "center",
                  fontSize: Colors.fontSizeBase * 1.375
                }}
              />
              <Scene
                key="clients"
                title="Clientes"
                component={DashboardContainer}
                Layout={ClientsComponent}
                {...DefaultProps.navbarProps}
                navigationBarStyle={{
                  backgroundColor: "#fff",
                  borderBottomColor: "#fff",
                  elevation: 0
                }}
                backButtonTintColor={Colors.brandPrimary}
                backButtonTextStyle={{ color: Colors.brandPrimary }}
                leftButtonTextStyle={{ color: Colors.brandPrimary }}
                titleStyle={{
                  color: Colors.brandPrimary,
                  alignSelf: "center",
                  fontFamily: "playfair",
                  textAlign: "center",
                  fontSize: Colors.fontSizeBase * 1.375
                }}
              />
              <Scene
                key="client"
                title="Cliente"
                component={ClientComponent}
                {...DefaultProps.navbarProps}
                navigationBarStyle={{
                  backgroundColor: "#fff",
                  borderBottomColor: "#fff",
                  elevation: 0
                }}
                backButtonTintColor={Colors.brandPrimary}
                backButtonTextStyle={{ color: Colors.brandPrimary }}
                leftButtonTextStyle={{ color: Colors.brandPrimary }}
                titleStyle={{
                  color: Colors.brandPrimary,
                  alignSelf: "center",
                  fontFamily: "playfair",
                  textAlign: "center",
                  fontSize: Colors.fontSizeBase * 1.375
                }}
              />
            </Stack>
            <Stack
              key="profile"
              title="Perfil"
              iconName={"user-female"}
              icon={TabIcon}
              {...DefaultProps.navbarProps}
            >
              <Scene
                key="profileHome"
                component={MemberContainer}
                Layout={ProfileComponent}
                {...DefaultProps.navbarProps}
              />
            </Stack>
            <Stack
              key="more"
              title="Más"
              iconName={"menu"}
              icon={TabIcon}
              {...DefaultProps.navbarProps}
            >
              <Scene
                key="more"
                title="Opciones"
                component={MemberContainer}
                {...DefaultProps.navbarProps}
                Layout={MoreComponent}
              />
              <Scene
                key="about"
                title="Acerca de Elenas"
                {...DefaultProps.navbarProps}
                component={AboutComponent}
              />
              <Scene
                back
                key="updateProfile"
                title="Actualizar Perfil"
                {...DefaultProps.navbarProps}
                component={UpdateProfileContainer}
                Layout={UpdateProfileComponent}
              />
              <Scene
                back
                clone
                key="paymentInfo"
                title="Pagos"
                {...DefaultProps.navbarProps}
                component={BankInfoContainer}
                Layout={PaymentInfoComponent}
              />
              <Scene
                back
                clone
                key="paymentInfoAdd"
                title="Agregar cuenta"
                {...DefaultProps.navbarProps}
                component={BankInfoContainer}
                Layout={PaymentInfoAddComponent}
              />
            </Stack>
          </Tabs>
        </Scene>
        <Scene>
          <Scene
            back
            key="search"
            title="Búsqueda"
            renderTitle={SearchInput}
            // renderRightButton={SearchButton}
            component={SearchComponent}
            {...DefaultProps.navbarProps}
            navigationBarStyle={{
              backgroundColor: "#fff",
              borderBottomColor: "#EEEDF2",
              elevation: 0
            }}
            backButtonTintColor={Colors.brandPrimary}
            backButtonTextStyle={{ color: Colors.brandPrimary }}
            leftButtonTextStyle={{ color: Colors.brandPrimary }}
            titleStyle={{
              left: 40,
              right: 40
            }}
          />
        </Scene>
        <Scene>
          <Scene
            back
            key="filters"
            title="Seleccionar"
            component={FiltersComponent}
            {...DefaultProps.navbarProps}
            navigationBarStyle={{
              backgroundColor: "#fff",
              borderBottomColor: "#EEEDF2",
              elevation: 0
            }}
            backButtonTintColor={Colors.brandPrimary}
            backButtonTextStyle={{ color: Colors.brandPrimary }}
            leftButtonTextStyle={{ color: Colors.brandPrimary }}
            titleStyle={{
              color: Colors.brandPrimary,
              alignSelf: "center",
              fontFamily: "playfair",
              textAlign: "center",
              fontSize: Colors.fontSizeBase * 1.375
            }}
          />
        </Scene>
        <Scene>
          <Scene
            back
            key="preview"
            {...DefaultProps.navbarProps}
            component={PreviewComponent}
            title=""
            renderRightButton={() => {
              return <SearchIcon dark />;
            }}
            navigationBarStyle={{
              backgroundColor: "#fff",
              borderBottomColor: "#fff",
              elevation: 0
            }}
            backButtonTintColor={Colors.brandPrimary}
            backButtonTextStyle={{ color: Colors.brandPrimary }}
            leftButtonTextStyle={{ color: Colors.brandPrimary }}
            rightButtonStyle={{ color: Colors.brandPrimary }}
          />
        </Scene>
        <Scene>
          <Scene
            back
            renderRightButton={() => {
              return <SearchIcon dark />;
            }}
            key="previewProduct"
            title=""
            {...DefaultProps.navbarProps}
            component={PreviewProductComponent}
            navigationBarStyle={{
              backgroundColor: "#fff",
              borderBottomColor: "#fff",
              elevation: 0
            }}
            backButtonTintColor={Colors.brandPrimary}
            backButtonTextStyle={{ color: Colors.brandPrimary }}
            leftButtonTextStyle={{ color: Colors.brandPrimary }}
            rightButtonStyle={{ color: Colors.brandPrimary }}
          />
        </Scene>
        <Scene>
          <Scene
            back
            clone
            renderRightButton={() => {
              return <View />;
            }}
            key="previewBlog"
            {...DefaultProps.navbarProps}
            component={PreviewBlogComponent}
            title=""
            renderRightButton={() => {
              return <SearchIcon dark />;
            }}
            navigationBarStyle={{
              backgroundColor: "#fff",
              borderBottomColor: "#fff",
              elevation: 0
            }}
            backButtonTintColor={Colors.brandPrimary}
            backButtonTextStyle={{ color: Colors.brandPrimary }}
            leftButtonTextStyle={{ color: Colors.brandPrimary }}
            rightButtonStyle={{ color: Colors.brandPrimary }}
          />
        </Scene>
        <Scene
          back
          clone
          renderRightButton={() => {
            return <View />;
          }}
          key="support"
          title="Soporte"
          {...DefaultProps.navbarProps}
          component={SupportComponent}
        />
        <Scene
          back
          clone
          renderRightButton={() => {
            return <View />;
          }}
          key="contact"
          title="Contacto"
          {...DefaultProps.navbarProps}
          component={ContactComponent}
        />
        <Scene
          back
          clone
          renderRightButton={() => {
            return <View />;
          }}
          modal
          key="terms"
          title="Terminos y condiciones"
          {...DefaultProps.navbarProps}
          component={TermsComponent}
        />

        <Scene
          key="store"
          back
          clone
          renderRightButton={() => {
            return <View />;
          }}
          title="Ver productos"
          {...DefaultProps.navbarProps}
          component={PreviewStore}
        />
      </Scene>
    </Stack>
    <Scene key="firstOrder" component={FirstOrderModal} />
  </Modal>
);

export default Index;
