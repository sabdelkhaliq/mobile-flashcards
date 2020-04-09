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
          placeholder="Question ..."
          value={this.state.question}
          onChangeText={this.onChangeQuestion}
        ></TextInput>
        <TextInput
          placeholder="Answer ..."
          value={this.state.answer}
          onChangeText={this.onChangeAnswer}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={this.addCardQuestion}
          disabled={Boolean(this.state.error)}
        >
          <Text>Add Question</Text>
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

export default withGlobalContext(NewQuestion);
