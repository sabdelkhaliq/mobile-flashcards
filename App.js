import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fetchAllDecks } from "./utils/Storage";
import DeckList from "./components/DeckList";
import NewDeck from "./components/NewDeck";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default class App extends React.Component {
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
    });
  }

  render() {
    const Tab = createBottomTabNavigator();
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Deck List">
            {(props) => <DeckList {...props} decks={this.state.decks} />}
          </Tab.Screen>
          <Tab.Screen name="Add Deck">
            {(props) => <NewDeck {...props} fetchDecks={this.fetchDecks} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
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
