import React, { Component } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Button, FormInput, Text } from "react-native-elements";
import { loginUser } from "../utils/Auth";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.performLogin = this.performLogin.bind(this);
  }

  setEmail(value) {
    this.setState({
      email: value
    });
  }

  setPassword(value) {
    this.setState({
      password: value
    });
  }

  performLogin() {
    const { email, password } = this.state;
    loginUser(email, password)
      .then(result => {
        this.props.navigation.navigate("SMSView");
      })
      .catch(error => {
        Alert.alert(error.code, error.message);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text h1 style={styles.headerText}>
          Awesome SMS Sign In
        </Text>
        <FormInput
          onChangeText={value => this.setEmail(value)}
          containerStyle={styles.textInputContainer}
          inputStyle={styles.textInput}
          placeholder={"Email"}
          keyboardType={"email-address"}
        />
        <FormInput
          onChangeText={value => this.setPassword(value)}
          containerStyle={styles.textInputContainer}
          inputStyle={styles.textInput}
          placeholder={"Password"}
          secureTextEntry
        />

        <Button
          large
          rounded
          title="LOGIN"
          backgroundColor="#FF8C00"
          containerViewStyle={{ width: "90%", height: 40 }}
          textStyle={{ fontWeight: "500" }}
          onPress={() => this.performLogin()}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.signUpText}>
            Don't have an account? Sign up now
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10
  },
  headerText: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30
  },
  textInputContainer: {
    height: 60,
    width: "90%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 50,
    marginVertical: 10,
    paddingHorizontal: 20
  },
  textInput: {
    fontSize: 20,
    color: "black"
  },
  signUpText: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30,
    fontSize: 16
  }
};
