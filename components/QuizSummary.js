import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function QuizSummary({ route, navigation }) {
  const { score, numberOfQuestions, deckTitle } = route.params;
  useEffect(() => {
    route.params.onClose();
  });
  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
      >{`You answered ${score} correct out of ${numberOfQuestions} Questions`}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Decks", {
            screen: "Deck",
            params: { deckTitle: deckTitle },
          })
        }
      >
        <Text style={styles.text}>Back to Deck</Text>
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
        <Text style={styles.text}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  );
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
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    margin: 5,
    width: "90%",
  },
});
