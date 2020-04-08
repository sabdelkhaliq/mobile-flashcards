import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

class DeckCard extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    let { deck, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Decks", {
            screen: "Deck",
            params: { deckTitle: deck.title },
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
