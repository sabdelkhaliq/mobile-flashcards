import React, { Component } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import DeckCard from "./DeckCard";
import { withGlobalContext } from "../MyContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';

class DeckList extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    let { decks } = this.props.global;
    let { navigation } = this.props;
    if (decks) {
      decks = Object.values(decks);
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.item}
            data={decks}
            renderItem={({ item }) => (
              <DeckCard navigation={navigation} deck={item}></DeckCard>
            )}
            keyExtractor={(item) => item.title}
          />
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Start adding your decks</Text>
          <MaterialCommunityIcons name="cards" size={32} />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#F5FCFF",
    alignSelf: "stretch",
  },
  text: {
    fontSize: 25,
    padding: 10,
    paddingBottom: 25,
    alignSelf: "center",
    color: "#6D6D6D"
  },
});

export default withGlobalContext(DeckList);
