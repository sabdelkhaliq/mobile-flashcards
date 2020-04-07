import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeckList from "../components/DeckList";
import NewDeck from "../components/NewDeck";
import { NavigationContainer } from "@react-navigation/native";
import MyContext from "../MyContext";
import { createStackNavigator } from "@react-navigation/stack";
import Deck from "../components/Deck";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNavComp() {
  return (
    <Stack.Navigator initialRouteName="DeckList" headerMode="screen">
      <Stack.Screen name="DeckList" component={DeckList}/>
      <Stack.Screen name="Deck" component={Deck} />
    </Stack.Navigator>
  );
}

export default function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="StackNavComp" component={StackNavComp} />
        <Tab.Screen name="Add Deck" component={NewDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
