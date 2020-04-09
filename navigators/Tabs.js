import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeckList from "../components/DeckList";
import NewDeck from "../components/NewDeck";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Deck from "../components/Deck";
import DeckCard from "../components/DeckCard";
import Quiz from "../components/Quiz";
import NewQuestion from "../components/NewQuestion";
import QuizSummary from "../components/QuizSummary";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Decks() {
  return (
    <Stack.Navigator initialRouteName="Deck List" headerMode="screen">
      <Stack.Screen name="Deck List" component={DeckList} />
      <Stack.Screen
        name="Deck"
        component={Deck}
        options={{
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="DeckCard"
        component={DeckCard}
        options={{
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="New Question"
        component={NewQuestion}
        options={{
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="Quiz Summary"
        component={QuizSummary}
        options={{  tabBarVisible: false, headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default class Tabs extends Component {
  getTabBarVisibility(route) {
    const routeName = route.state ? route.state.routes[route.state.index].name : '';
    if (routeName === 'Deck' || routeName === 'NewQuestion'|| routeName === 'Quiz')  {
      return false;
    }
    return true;
  }
  
  render() {

    
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Decks" component={Decks} options={({ route }) => ({
            tabBarVisible: this.getTabBarVisibility(route)
          })}/>
          <Tab.Screen name="Add Deck" component={NewDeck} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}
