import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withGlobalContext } from "../MyContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Deck extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const { stateFlag } = this.props.global;

    if (!stateFlag) return <Text>Loading...</Text>;
    else {
      const { deckTitle } = this.props.route.params;
      const { decks } = this.props.global;

      let decksArr = Object.values(decks);
      const deck = decksArr[decksArr.findIndex((d) => d.title === deckTitle)];

      return (
        <View style={styles.container}>
          <Text style={styles.text}>{deck.title}</Text>
          <Text style={styles.text}>{`${deck.questions.length} cards`}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Decks", {
                screen: "New Question",
                params: { deckTitle: deck.title },
              })
            }
          >
            <Text style={(styles.textButton)}>Add Card</Text>
            
            

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Decks", {
                screen: "Quiz",
                params: {
                  deckTitle: deckTitle,
                },
              })
            }
          >
            <Text style={(styles.textButton)}>Take Quiz</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  textButton: {
    fontSize: 15,
    padding: 10,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#6D6D6D",
  },
  text: {
    fontSize: 35,
    padding: 10,
    paddingBottom: 25,
    alignSelf: "center",
    color: "#6D6D6D"
  },
  button: {
    flex: 1,
    backgroundColor: "#DDDDDD",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    margin: 5,
    width: "90%"
  },
});

export default withGlobalContext(Deck);
