import React, { Component } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Button, FormInput, Text } from "react-native-elements";
import { registerUser } from "../utils/Auth";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPwd: ""
    };
    this.performRegistration = this.performRegistration.bind(this);
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

  setConfirmPwd(value) {
    this.setState({
      confirmPwd: value
    });
  }

  performRegistration() {
    const { email, password } = this.state;
    registerUser(email, password)
      .then(result => {
        this.props.navigation.navigate("SMSView");
      })
      .catch(error => {
        Alert.alert(error.code, error.message);
      });
  }

  render() {
    const { email, password, confirmPwd } = this.state;
    return (
      <View style={styles.container}>
        <Text h1 style={styles.headerText}>
          Awesome SMS Registration
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

        <FormInput
          onChangeText={value => this.setConfirmPwd(value)}
          containerStyle={styles.textInputContainer}
          inputStyle={styles.textInput}
          placeholder={"Confirm Password"}
          secureTextEntry
        />
        <Button
          large
          rounded
          title="SIGN UP"
          backgroundColor="#FF8C00"
          containerViewStyle={{ width: "90%", height: 40 }}
          textStyle={{ fontWeight: "500" }}
          disabled={!email && !password && password !== confirmPwd}
          onPress={() => this.performRegistration()}
        />

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.signUpText}>
            Already have an account? Sign in now
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
