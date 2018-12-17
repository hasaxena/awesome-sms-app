import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator
} from "react-native";
import { TabView } from "react-native-tab-view";
import moment from "moment";
import checkMessagePermission from "../utils/SMSPermission";
import accessSMS from "../utils/SMSReader";

const renderLoading = () => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" />
  </View>
);

const renderSMSList = ({ item, index }) => {
  const date = moment(item.date).format("MMM DD");
  return (
    <View style={{ flex: 1, height: "100%", width: "100%" }} key={`${index}`}>
      <View
        style={[
          styles.row,
          {
            marginVertical: 5,
            paddingHorizontal: 10
          }
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text style={styles.addressText}>{item.address}</Text>
          <Text
            style={{
              textAlign: "justify",
              alignSelf: "flex-end",
              marginRight: 5,
              color: "gray"
            }}
          >
            {date}
          </Text>
        </View>
        <Text style={styles.messageText}>{item.body}</Text>
      </View>
    </View>
  );
};

renderMessages = (list, loading) => (
  <View style={[styles.scene, { backgroundColor: "white" }]}>
    {(list && list.length > 0) || !loading ? (
      <FlatList
        data={list}
        keyExtractor={(item, index) => index}
        renderItem={renderSMSList}
      />
    ) : (
      renderLoading()
    )}
  </View>
);
export default class SMSView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "All" },
      { key: "second", title: "Transaction" },
      { key: "third", title: "Misc" }
    ],
    smsList: [],
    transactionList: [],
    miscList: [],
    loading: true
  };

  async componentWillMount() {
    const result = await checkMessagePermission();
    if (result) {
      accessSMS().then(list => {
        const transaction = list.filter(item =>
          /^[a-zA-Z]+$/.test(item.address.substr(0, 2))
        );
        const misc = list.filter(
          item => !/^[a-zA-Z]+$/.test(item.address.substr(0, 2))
        );
        this.setState({
          transactionList: transaction,
          miscList: misc,
          smsList: list,
          loading: false
        });
      });
    }
  }

  renderScene = ({ route }) => {
    const { smsList, transactionList, miscList, loading } = this.state;
    switch (route.key) {
      case "first":
        return renderMessages(smsList, loading);
      case "second":
        return renderMessages(transactionList, loading);
      case "third":
        return renderMessages(miscList, loading);
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  row: {
    flex: 1
  },
  transactionBorderedRow: {
    flex: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "lightgrey",
    borderColor: "gray"
  },
  addressText: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 5,
    color: "black"
  },
  messageText: {
    fontSize: 14,
    fontWeight: "200",
    marginVertical: 2
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)"
  }
});
