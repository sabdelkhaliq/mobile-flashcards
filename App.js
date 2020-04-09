import React, { Component } from "react";
import MyContext from "./MyContext";
import Tabs from "./navigators/Tabs";
import { setLocalNotification } from "./utils/Notifications";
import { clearStorage, fetchAllDecks } from "./utils/Storage";

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
    clearStorage();
    setLocalNotification();
    this.fetchDecks();
  }

  fetchDecks() {
    this.resetStateFlag();
    fetchAllDecks().then((decks) => {
      this.setState({ decks: decks });
      this.setState({ stateFlag: true });
    });
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
