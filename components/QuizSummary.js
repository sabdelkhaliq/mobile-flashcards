import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function QuizSummary({ route, navigation }) {
  const { score, questions, deckTitle } = route.params;

  return (
    <View>
      <Text>{`You answered ${score} correct out of ${questions.length} Questions}`}</Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Decks", {
            screen: "Deck",
            params: { deckTitle: deckTitle },
          })
        }
      >
        <Text style={styles.item}>Back to Deck</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("Decks", {
            screen: "Quiz",
            params: { questions: questions },
          })
        }
      >
        <Text style={styles.item}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  );
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
    alignItems: "center",
  },
});
