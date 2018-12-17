import React from "react";
import { View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import SMSView from "./app/screens/SMSView";

// import AppContainer from "./Routes";

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

const AppNavigator = createStackNavigator(
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
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

// const AppContainer = createAppContainer(AppNavigator);

// class App extends React.Component {
//   render() {
//     return (
//       <View>
//         <AppContainer
//           ref={nav => {
//             this.navigator = nav;
//           }}
//         />
//       </View>
//     );
//   }
// }

export default createAppContainer(AppNavigator);
