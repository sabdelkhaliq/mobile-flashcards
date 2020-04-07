import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isDeckWithSameName, addDeck } from "../utils/Storage";
import { withGlobalContext } from "../MyContext";

class Quiz extends Component {
  render() {
    const { deckTitle } = this.props.route.params;

    return (
        <Text>{JSON.stringify(deckTitle)}</Text>

    );
  }
}

export default Quiz;
