import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NewDeck from "./NewDeck";
import DeckCard from "./DeckCard";

class DeckList extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    let { decks } = this.props;

    if (decks) {
      decks = Object.values(decks);
      return (
        <View style={styles.container}>
          <Text style={styles.item}>Hello</Text>
          <FlatList
            style={styles.item}
            data={decks}
            renderItem={({ item }) => <DeckCard deck={item}></DeckCard>}
            keyExtractor={(item) => item.title}
          />
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          <Text style={styles.item}>Start adding your decks</Text>
          <NewDeck style={styles.item}></NewDeck>
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
  item: {
    backgroundColor: "#F5FCFF",
    alignSelf: "stretch",
    textAlign: "center",
  },
});

export default DeckList;
