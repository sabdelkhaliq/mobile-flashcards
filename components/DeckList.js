import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NewDeck from "./NewDeck";
import DeckCard from "./DeckCard";
import { withGlobalContext } from "../MyContext";

class DeckList extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    let { decks } = this.props.global;
    let {navigation} = this.props;
    if (decks) {
      decks = Object.values(decks);
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.item}
            data={decks}
            renderItem={({ item }) => <DeckCard navigation={navigation} deck={item}></DeckCard>}
            keyExtractor={(item) => item.title}
          />
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          <Text style={styles.item}>Start adding your decks</Text>
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
  },
});

export default withGlobalContext(DeckList);
