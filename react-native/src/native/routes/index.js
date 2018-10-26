import React from "react";
import { Scene, Tabs, Stack } from "react-native-router-flux";
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

import AboutComponent from "../components/About";
import DashboardContainer from "../../containers/Dashboard";
import DashboardComponent from "../components/Dashboard";

import PreviewComponent from "../components/Preview";
import WelcomeComponent from "../components/Welcome";
import AppLogoComponent from "../components/AppLogo";

const Index = (
  <Stack hideNavBar>
    <Scene key="welcome" component={WelcomeComponent} />
    <Scene hideNavBar activeTintColor="#93a8d5" inactiveTintColor="#3b5998">
      <Tabs key="tabbar" swipeEnabled type="replace" {...DefaultProps.tabProps}>
        <Stack
          key="home"
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
          key="recipes"
          title="Recetas"
          iconName={"book"}
          icon={TabIcon}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="recipes"
            component={RecipesContainer}
            Layout={RecipesComponent}
          />
        </Stack>

        <Stack
          key="profile"
          title="Perfil"
          iconName={"user"}
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
            key="signUp"
            title="Crea tu cuenta"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="Inicia sesión"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="Reestablecer contraseña"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
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
      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="recipe"
      title="RECIPE"
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeViewComponent}
    />

    <Scene
      back
      clone
      key="preview"
      title="Vista Previa"
      {...DefaultProps.navbarProps}
      component={DashboardContainer}
      Layout={PreviewComponent}
    />
  </Stack>
);

export default Index;
