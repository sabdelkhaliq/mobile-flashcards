import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getQuestionsInDeck, removeNotifications } from "../utils/Storage";
import * as Permissions from 'expo-permissions';


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
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status === "granted") {
          removeNotifications().then(setLocalNotification);
        }
      });
      navigation.navigate("Decks", {
        screen: "Quiz Summary",
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

    if (!questions || questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Deck is empty</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text
            style={styles.text}
          >{`${currentQuestion} / ${questions.length}`}</Text>
          <Text style={styles.text}>
            {!answerShown
              ? `Q: ${questions[currentQuestion - 1].question} ?`
              : `A: ${questions[currentQuestion - 1].answer}`}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.toggleAnswer}>
            <Text>Show answer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.answerCorrect}>
            <Text>Correct Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.checkRemainingQuestions}
          >
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

export default Quiz;
