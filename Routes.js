import React from "react";
import { createStackNavigator } from "react-navigation";

import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import SMSView from "./app/screens/SMSView";

const DEFAULT_NAV_OPTIONS = {
  headerStyle: {
    backgroundColor: "transparent",
    height: 50
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

export default createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    },
    SMSView: {
      screen: SMSView
    }
  },
  {
    initialRouteName: "Login",
    navigationOptions: {
      ...DEFAULT_NAV_OPTIONS
    }
  }
);
