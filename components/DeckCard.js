import React, { Component } from "react";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";

class DeckCard extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
      let {deck} = this.props;
    return (
        <Card containerStyle={styles.container} title={deck.title}>
            <TouchableOpacity>
               <Text>{`${deck.questions.length} cards`}</Text>
            </TouchableOpacity>
            </Card>

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
  });

export default DeckCard;
