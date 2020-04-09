import { AsyncStorage } from "react-native";
import {
  DECKS_STORAGE_KEY,
  QUESTION_STORAGE_KEY,
  NOTIFICATION_KEY,
} from "./StorageKeys";
// Deck:
// {"title":"deck","questions":[1,2,3]}

// Question:
// { "title":'',"answer":}

export function isDeckTitleRepeated(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
    result = JSON.parse(result);
    if (result && result[deckId]) {
      return true;
    }
    {
      return false;
    }
  });
}

export function isQuestionRepeatedInDeck(question, deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
    result = JSON.parse(result);
    let questions = result[deckId].questions;
    if (result && questions.includes(question)) {
      return true;
    }
    {
      return false;
    }
  });
}

export function fetchAllDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) =>
    JSON.parse(result)
  );
}

export function getQuestionsInDeck(deckTitle) {
  return AsyncStorage.getItem(QUESTION_STORAGE_KEY).then((result) => {
    result = JSON.parse(result);
    let questions = Object.values(result);
    let questionsArr = questions.filter(
      (question) => question.deckTitle.localeCompare(deckTitle) === 0
    );
    return questionsArr;
  });
}

export function addDeck(deckData, refereshDecks) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [deckData.title]: deckData,
    }),
    refereshDecks
  );
}

export function addQuestion(question, deckId, refereshDecks) {
  return Promise.all([
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((data) => {
        data = JSON.parse(data);
        let deck = data[deckId];
        deck.questions.push(question.question);
        data[deckId] = deck;
        return data;
      })
      .then((data) =>
        AsyncStorage.setItem(
          DECKS_STORAGE_KEY,
          JSON.stringify(data),
          refereshDecks
        )
      ),
    AsyncStorage.mergeItem(
      QUESTION_STORAGE_KEY,
      JSON.stringify({
        [question.question]: question,
      })
    ),
  ]);
}

export function clearStorage() {
  AsyncStorage.clear();
}

////////////Notifications
export function removeNotifications() {
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function getNotification() {
  return AsyncStorage.getItem(NOTIFICATION_KEY);
}

export function setNotification() {
  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
}
