import React, { Component } from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";

class DeckCard extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
    };
    this.fadeOut = this.fadeOut.bind(this);
  }

  fadeOut = () => {
    let { deck, navigation } = this.props;
    Animated.timing(this.state.fadeAnim, {
      toValue: .5,
      duration: 1500,
    }).start(() =>
      navigation.navigate("Decks", {
        screen: "Deck",
        params: { deckTitle: deck.title },
      })
    );
  };

  render() {
    let { deck } = this.props;
    return (
      <View style={styles.container}>
        
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: this.state.fadeAnim,
            },
          ]}
        >
          <TouchableOpacity onPress={this.fadeOut}>
          <Card containerStyle={styles.card} title={deck.title}>
            <Text>{`${deck.questions.length} cards`}</Text>
          </Card>
          </TouchableOpacity>
        </Animated.View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fadingContainer: {
    flex:1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "stretch",
  },
  card: {
    backgroundColor: "#DDDDDD",
    alignSelf: "stretch",
    alignItems: "center",
  },
});

export default DeckCard;
