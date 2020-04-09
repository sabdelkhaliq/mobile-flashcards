import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withGlobalContext } from "../MyContext";


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
          <Text style={styles.item}>{deck.title}</Text>
          <Text style={styles.item}>{`${deck.questions.length} cards`}</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Decks", {
                screen: "NewQuestion",
                params: { deckTitle: deck.title },
              })
            }
          >
            <Text style={styles.item}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Decks", {
                screen: "Quiz",
                params: { 
                  deckTitle: deckTitle },
              })
            }
          >
            <Text style={styles.item}>Take Quiz</Text>
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
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  item: {
    backgroundColor: "#F5FCFF",
    alignSelf: "stretch",
  },
});

export default withGlobalContext(Deck);
