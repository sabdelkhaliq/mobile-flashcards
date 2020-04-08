import React, { Component } from "react";

import { Text, View, StyleSheet } from "react-native";
import { withGlobalContext } from "../MyContext";
import { TouchableOpacity } from "react-native-gesture-handler";

class Deck extends React.Component {
  componentDidMount() {
    console.log("did mount");
  }
  render() {
    const { deck } = this.props.route.params;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.item}>{deck.title}</Text>
        <Text style={styles.item}>{`${deck.questions.length} cards`}</Text>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("StackNavComp", {
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
            navigation.navigate("StackNavComp", {
              screen: "Quiz",
              params: { deckTitle: deck.title },
            })
          }
        >
          <Text style={styles.item}>Take Quiz</Text>
        </TouchableOpacity>
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

export default withGlobalContext(Deck);
