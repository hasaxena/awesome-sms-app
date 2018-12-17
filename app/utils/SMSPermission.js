import { Alert } from "react-native";
import Permissions from "react-native-permissions";

function requestMessagePermission() {
  return new Promise((resolve, reject) => {
    // Returns once the user has chosen to 'allow' or to 'not allow' access
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    Permissions.request("readSms", {
      rationale: {
        title: "Awesome SMS App Permission",
        message: "Awesome SMS App needs access to your message to organize them"
      }
    })
      .then(response => {
        if (response === "authorized") {
          resolve(true);
        } else {
          showRejectMessage();
          resolve(false);
        }
      })
      .catch(error => {
        resolve(false);
      });
  });
}

export default function checkMessagePermission() {
  return new Promise((resolve, reject) => {
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    Permissions.check("readSms")
      .then(response => {
        if (response === "undetermined" || response === "denied") {
          requestMessagePermission()
            .then(result => {
              resolve(result);
            })
            .catch(error => {
              resolve(false);
            });
        } else if (response === "authorized") {
          resolve(true);
        } else {
          showRejectMessage();
          resolve(false);
        }
      })
      .catch(error => {
        resolve(false);
      });
  });
}

function showRejectMessage() {
  Alert.alert(
    "Permission Denied",
    `You don't have access to read SMS from Device, please change manually from device settings.`,
    [
      {
        text: "OK",
        onPress: () => console.log("Permission denied"),
        style: "cancel"
      }
    ]
  );
}
