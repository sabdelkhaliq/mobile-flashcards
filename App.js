import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Tabs from "./navigators/Tabs";
import { fetchAllDecks } from "./utils/Storage";
import MyContext from "./MyContext";

export default class App extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      decks: "",
    };
    this.fetchDecks = this.fetchDecks.bind(this);
  }

  componentDidMount() {
    this.fetchDecks();
  }

  fetchDecks() {
    fetchAllDecks().then((decks) => {
      this.setState({ decks: decks });
      console.log(this.state.decks);
    });
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          decks: this.state.decks,
          fetchDecks: this.fetchDecks,
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
