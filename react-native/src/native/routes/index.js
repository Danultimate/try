import React from "react";
import { Drawer, Scene, Tabs, Stack, Modal } from "react-native-router-flux";
import { View } from "react-native";

import TabIcon from "../components/TabIcon";
import AppLogoComponent from "../components/AppLogo";

import DefaultProps from "../constants/navigation";
import AppConfig from "../../constants/config";

import RecipesContainer from "../../containers/Recipes";
import RecipesComponent from "../components/Recipes";
import RecipeViewComponent from "../components/Recipe";

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

import MemberContainer from "../../containers/Member";
import ProfileComponent from "../components/Profile";

import DashboardContainer from "../../containers/Dashboard";
import DashboardComponent from "../components/Dashboard";

import PreviewComponent from "../components/Preview";
import PreviewBlogComponent from "../components/PreviewBlog";
import PreviewProductComponent from "../components/PreviewProduct";

import WelcomeComponent from "../components/Welcome";
import OnboardingComponent from "../components/Onboarding";

import ClientsComponent from "../components/Clients";
import OrdersComponent from "../components/Orders";
import ContactComponent from "../components/Contact";
import TermsComponent from "../components/Terms";
import SupportComponent from "../components/Support";
import AboutComponent from "../components/About";
import MoreComponent from "../components/More";
import SideMenu from "../components/SideMenu";

const Index = (
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
      <Scene key="onboarding" hideNavBar component={OnboardingComponent} />
      <Scene
        renderRightButton={() => {
          return <View />;
        }}
        key="terms"
        title="Terminos y condiciones"
        {...DefaultProps.navbarProps}
        component={TermsComponent}
      />
    </Scene>
    <Scene hideNavBar activeTintColor="#93a8d5" inactiveTintColor="#3b5998">
      <Tabs key="tabbar" swipeEnabled type="replace" {...DefaultProps.tabProps}>
        <Stack
          key="home"
          title="Inicio"
          renderTitle={() => {
            return <AppLogoComponent />;
          }}
          iconName={"home"}
          icon={TabIcon}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="home"
            component={DashboardContainer}
            Layout={DashboardComponent}
          />
        </Stack>

        <Stack
          key="clients"
          title="Clientes"
          iconName={"people"}
          icon={TabIcon}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="clients"
            component={DashboardContainer}
            Layout={ClientsComponent}
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
            component={DashboardContainer}
            Layout={OrdersComponent}
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
          />
          <Scene
            back
            key="locale"
            title="Cambiar Idioma"
            {...DefaultProps.navbarProps}
            component={LocaleContainer}
            Layout={LocaleComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="Actualizar Perfil"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
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
        </Stack>
      </Tabs>
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
      back
      clone
      key="recipe"
      title="Receta"
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeViewComponent}
    />
    <Scene
      back
      clone
      renderRightButton={() => {
        return <View />;
      }}
      key="preview"
      title="Vista Previa"
      {...DefaultProps.navbarProps}
      // component={DashboardContainer}
      // Layout={PreviewComponent}
      component={PreviewComponent}
    />
    <Scene
      back
      clone
      renderRightButton={() => {
        return <View />;
      }}
      key="previewBlog"
      title="Vista Previa"
      {...DefaultProps.navbarProps}
      // component={DashboardContainer}
      // Layout={PreviewComponent}
      component={PreviewBlogComponent}
    />
    <Scene
      back
      clone
      renderRightButton={() => {
        return <View />;
      }}
      key="previewProduct"
      title="Vista Previa"
      {...DefaultProps.navbarProps}
      component={DashboardContainer}
      Layout={PreviewProductComponent}
    />
  </Scene>
);

export default Index;
