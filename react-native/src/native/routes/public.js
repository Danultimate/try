import React from "react";
import { Drawer, Scene, Tabs, Stack, Modal } from "react-native-router-flux";
import TabIcon from "../components/TabIcon";

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

import WelcomeComponent from "../components/Welcome";
import AppLogoComponent from "../components/AppLogo";

import ClientsComponent from "../components/Clients";
import OrdersComponent from "../components/Orders";
import ContactComponent from "../components/Contact";
import TermsComponent from "../components/Terms";
import SupportComponent from "../components/Support";
import AboutComponent from "../components/About";
import MoreComponent from "../components/More";
import SideMenu from "../components/SideMenu";

const Index = (
  <Stack hideNavBar>
    <Scene key="welcome" component={WelcomeComponent} />
    <Scene
      key="signUp"
      title="Crea tu cuenta"
      {...DefaultProps.navbarProps}
      component={SignUpContainer}
      Layout={SignUpComponent}
    />
    <Scene
      key="login"
      title="Inicia sesión"
      {...DefaultProps.navbarProps}
      component={LoginContainer}
      Layout={LoginComponent}
    />
    <Scene
      key="forgotPassword"
      title="Reestablecer contraseña"
      {...DefaultProps.navbarProps}
      component={ForgotPasswordContainer}
      Layout={ForgotPasswordComponent}
    />
    <Scene
      back
      clone
      key="terms"
      title="Terminos y condiciones"
      {...DefaultProps.navbarProps}
      component={TermsComponent}
    />
    <Scene
      back
      clone
      key="support"
      title="Soporte"
      {...DefaultProps.navbarProps}
      component={SupportComponent}
    />
    <Scene
      back
      clone
      key="contact"
      title="Contacto"
      {...DefaultProps.navbarProps}
      component={ContactComponent}
    />
    <Scene
      back
      clone
      key="terms"
      title="Terminos y condiciones"
      {...DefaultProps.navbarProps}
      component={TermsComponent}
    />
  </Stack>
);

export default Index;
