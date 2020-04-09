import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { withGlobalContext } from "../MyContext";
import { addDeck, isDeckTitleRepeated } from "../utils/Storage";

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
          style={styles.button}
          placeholder="Deck Title"
          value={this.state.title}
          onChangeText={this.onChangeDeckTitle}
        ></TextInput>
        <TouchableOpacity
          style={(styles.button, { backgroundColor: "#DDDDDD" })}
          onPress={this.addNewDeck}
          disabled={Boolean(this.state.error)}
        >
          <Text style={styles.textButton}>Add Deck</Text>
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
    margin: 5,
  },
  button: {
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    margin: 5,
    marginBottom: 25,
    width: "90%",
  },
  textButton: {
    fontSize: 20,
    padding: 10,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#6D6D6D",
  },
});

export default withGlobalContext(NewDeck);
