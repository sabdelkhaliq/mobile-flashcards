import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchAllDecks } from './utils/Storage';
import DeckList from './components/DeckList';

export default class App extends React.Component {

  constructor({ props }) {
    super(props);
    this.state = {
      decks: '',
    }
  }

  componentDidMount() {
    fetchAllDecks().then((decks) =>
      this.setState({ decks: decks })
    )
  }



  render() {
    return (
      //show tabs
      <View style={styles.container}>
        <DeckList decks={this.state.decks} />
      </View>

      // <NavigationContainer>
      //   <Tab.Navigator>
      //     <Tab.Screen name="Deck List" component={DeckList} />
      //     <Tab.Screen name="Add Deck" component={NewDeck} />
      //   </Tab.Navigator>
      // </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
