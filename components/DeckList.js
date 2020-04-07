import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NewDeck from "./NewDeck";
import Deck from "./Deck";

class DeckList extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    let { decks } = this.props;
    decks = Object.values(decks);
    console.log(decks);
    if (decks)
      return (
        <View style={styles.container}>
          <Text>Hello</Text>
          <FlatList
            data={decks}
            renderItem={({ item }) => <Deck>{item}</Deck>}
          />
        </View>
      );
    else
      return (
        <View style={styles.container}>
          <Text>Start adding your decks</Text>
          <NewDeck></NewDeck>
        </View>
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

export default DeckList;
