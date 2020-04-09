import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Tabs from "./navigators/Tabs";
import { fetchAllDecks, clearStorage } from "./utils/Storage";
import MyContext from "./MyContext";
import { setLocalNotification } from './utils/Notifications'
 
export default class App extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      decks: "",
      stateFlag: false,
    };
    this.fetchDecks = this.fetchDecks.bind(this);
    this.resetStateFlag = this.resetStateFlag.bind(this);
  }

  componentDidMount() {
    setLocalNotification();
    this.fetchDecks();
  }

  fetchDecks() {
    this.resetStateFlag();
    fetchAllDecks()
      .then((decks) => {
        this.setState({ decks: decks });
        this.setState({ stateFlag: true });
      })
  }

  resetStateFlag() {
    this.setState({ stateFlag: false });
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          ...this.state,
          fetchDecks: this.fetchDecks,
          resetStateFlag: this.resetStateFlag,
        }}
      >
        <Tabs />
      </MyContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
