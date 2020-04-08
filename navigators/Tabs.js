import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeckList from "../components/DeckList";
import NewDeck from "../components/NewDeck";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Deck from "../components/Deck";
import DeckCard from "../components/DeckCard";
import Quiz from "../components/Quiz";
import NewQuestion from "../components/NewQuestion";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Decks() {
  return (
    <Stack.Navigator initialRouteName="DeckList" headerMode="screen">
      <Stack.Screen name="DeckList" component={DeckList} />
      <Stack.Screen name="Deck" component={Deck} />
      <Stack.Screen name="DeckCard" component={DeckCard} />
      <Stack.Screen name="NewQuestion" component={NewQuestion} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}

export default function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Decks" component={Decks} />
        <Tab.Screen name="Add Deck" component={NewDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
