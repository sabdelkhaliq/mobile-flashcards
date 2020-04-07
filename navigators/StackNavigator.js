import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import DeckList from "../components/DeckList";

export default class HomeStackScreen extends Component {
  render() {
    const Stack = createStackNavigator();
    let { decks } = this.props;
    return (
      <Stack.Navigator initialRouteName="DeckList" headerMode="screen">
        <Stack.Screen name="DeckList">
          {(props) => <DeckList {...props} decks={decks} />}
        </Stack.Screen>
        />
      </Stack.Navigator>
    );
  }
}
