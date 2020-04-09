import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

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
    const { questions } = this.props.route.params;

    this.setState({ questions: questions });
  }
  toggleAnswer() {
    this.setState((prevState) => ({
      answerShown: !prevState.answerShown,
    }));
  }

  checkRemainingQuestions() {
    let { questions, currentQuestion, score } = this.state;
    const { deckTitle } = this.props.route.params;
    const { navigate } = this.props.navigation;

    if (currentQuestion === questions.length) {
      navigate("Decks", {
        screen: "QuizSummary",
        params: { deckTitle: deckTitle, score: score, questions: questions },
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
    const { deckTitle } = this.props.route.params;

    if (questions.length === 0) {
      return (
        <View>
          <Text>Deck is empty</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              this.props.navigation.navigate("Decks", {
                screen: "NewQuestion",
                params: { deckTitle: deckTitle },
              })
            }
          >
            <Text style={styles.item}>Add Card</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text>{`${currentQuestion} / ${questions.length}`}</Text>
          <Text>
            {answerShown
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
