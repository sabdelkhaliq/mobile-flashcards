import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isDeckTitleRepeated, addDeck } from "../utils/Storage";
import { withGlobalContext } from "../MyContext";

class NewDeck extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      title: "",
      error: "",
    };
    this.onChangeDeckTitle = this.onChangeDeckTitle.bind(this);
    this.addNewDeck = this.addNewDeck.bind(this);
    this.refereshDecks = this.refereshDecks.bind(this);
  }

  addNewDeck() {
    let { title } = this.state;
    let { navigation } = this.props;

    const questions = [];

    if (!title) this.setState({ error: "Enter a title for your Deck" });
    else
      isDeckTitleRepeated(title).then((result) =>
        result
          ? this.setState({ error: "You have a deck with the same title" })
          : addDeck({ title, questions }, this.refereshDecks).then(() => {
              //resetStateFlag();
              navigation.navigate("Decks", {
                screen: "Deck",
                params: { deckTitle: title },
              });
            })
      );
  }

  onChangeDeckTitle(text) {
    this.setState({ title: text, error: "" });
  }

  refereshDecks() {
    let { fetchDecks } = this.props.global;
    fetchDecks();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Deck Title"
          value={this.state.title}
          onChangeText={this.onChangeDeckTitle}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={this.addNewDeck}
          disabled={Boolean(this.state.error)}
        >
          <Text>Add Deck</Text>
        </TouchableOpacity>
        <Text>{this.state.error}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default withGlobalContext(NewDeck);
