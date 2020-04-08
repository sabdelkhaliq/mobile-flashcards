import React, { Component } from "react";
import { Text } from "react-native";

class Quiz extends Component {
  render() {
    const { deck } = this.props.route.params;
    const deckTitle = deck.title;
    getQuestionsInDeck(deckTitle).then(result=> console.log(JSON.stringify(result)))

    return (
      
        <Text>{JSON.stringify(deckTitle)}</Text>
    );
  }
}

export default Quiz;
