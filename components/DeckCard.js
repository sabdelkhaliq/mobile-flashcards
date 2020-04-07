import React, { Component } from "react";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";
import Deck from "./Deck";

class DeckCard extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    let { deck, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("StackNavComp", {
            screen: "Deck",
            params: { deck: deck },
          })
        }
      >
        <Card containerStyle={styles.container} title={deck.title}>
          <Text>{`${deck.questions.length} cards`}</Text>
        </Card>
      </TouchableOpacity>
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

export default DeckCard;
