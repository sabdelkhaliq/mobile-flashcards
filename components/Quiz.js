import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getQuestionsInDeck } from "../utils/Storage";
import { StackActions, NavigationActions } from "react-navigation";

class Quiz extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      currentQuestion: 1,
      score: 0,
      answerShown: false,
      questions: [],
    };

    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.checkRemainingQuestions = this.checkRemainingQuestions.bind(this);
    this.answerCorrect = this.answerCorrect.bind(this);
  }

  componentDidMount() {
    const { deckTitle } = this.props.route.params;
    getQuestionsInDeck(deckTitle).then((result) => {
      this.setState({ questions: result });
    });
  }

  toggleAnswer() {
    this.setState((prevState) => ({
      answerShown: !prevState.answerShown,
    }));
  }

  checkRemainingQuestions() {
    let { questions, currentQuestion, score } = this.state;
    const { deckTitle } = this.props.route.params;
    const { navigation } = this.props;
    if (currentQuestion === questions.length) {
      navigation.navigate("Decks", {
        screen: "QuizSummary",
        params: {
          deckTitle: deckTitle,
          score: score,
          numberOfQuestions: questions.length,
          onClose: () => {
            this.setState({ currentQuestion: 1, score: 0, answerShown: false });
          },
        },
      });
    } else
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        answerShown: false,
      }));
  }

  answerCorrect() {
    this.setState(
      (prevState) => ({ score: prevState.score + 1 }),
      () => {
        this.checkRemainingQuestions();
      }
    );
  }

  render() {
    let { questions, currentQuestion, score, answerShown } = this.state;

    if (questions.length === 0) {
      return (
        <View>
          <Text>Deck is empty</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>{`${currentQuestion} / ${questions.length}`}</Text>
          <Text>
            {!answerShown
              ? questions[currentQuestion - 1].question
              : questions[currentQuestion - 1].answer}
          </Text>
          <TouchableOpacity onPress={this.toggleAnswer}>
            <Text>Show answer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.answerCorrect}>
            <Text>Correct Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.checkRemainingQuestions}>
            <Text>Wrong Answer</Text>
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
    alignItems: "center",
  },
});

export default Quiz;
