import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { withGlobalContext } from "../MyContext";
import { addQuestion, isQuestionRepeatedInDeck } from "../utils/Storage";

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      error: "",
    };
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.addCardQuestion = this.addCardQuestion.bind(this);
    this.refereshDecks = this.refereshDecks.bind(this);
  }

  addCardQuestion() {
    const { deckTitle } = this.props.route.params;
    const { answer, question } = this.state;
    const { navigation } = this.props;

    if (!question) this.setState({ error: "Enter the question of the card" });
    else if (!answer) this.setState({ error: "Enter an answer" });
    else
      isQuestionRepeatedInDeck(question, deckTitle).then((result) => {
        if (result) {
          this.setState({
            error: "You have a card with the same question in this deck",
          });
        } else {
          addQuestion(
            { question, answer, deckTitle },
            deckTitle,
            this.refereshDecks
          ).then(() => {
            //resetStateFlag();
            navigation.navigate("Decks", {
              screen: "Deck",
              params: { deckTitle: deckTitle },
            });
          });
        }
      });
  }

  refereshDecks() {
    let { fetchDecks } = this.props.global;
    fetchDecks();
  }

  onChangeQuestion(text) {
    this.setState({ question: text, error: "" });
  }

  onChangeAnswer(text) {
    this.setState({ answer: text, error: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.button}
          placeholder="Question ..."
          value={this.state.question}
          onChangeText={this.onChangeQuestion}
        ></TextInput>
        <TextInput
          style={styles.button}
          placeholder="Answer ..."
          value={this.state.answer}
          onChangeText={this.onChangeAnswer}
        ></TextInput>
        <TouchableOpacity
          style={(styles.button, { backgroundColor: "#DDDDDD" })}
          onPress={this.addCardQuestion}
          disabled={Boolean(this.state.error)}
        >
          <Text style={styles.textButton}>Add Question</Text>
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

export default withGlobalContext(NewQuestion);
