import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeckList from "../components/DeckList";
import NewDeck from "../components/NewDeck";
import { NavigationContainer } from "@react-navigation/native";
import MyContext from "../MyContext";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (<NavigationContainer>
    <MyContext.Consumer>
      {(context) => (
        
          <Tab.Navigator>
            <Tab.Screen name="Home">
              {(props) => <DeckList {...props} decks={context.decks} />}
            </Tab.Screen>
            <Tab.Screen name="Add Deck">
              {(props) => (
                <NewDeck {...props} fetchDecks={context.fetchDecks} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
      )}
    </MyContext.Consumer>
    </NavigationContainer>
  );
}
