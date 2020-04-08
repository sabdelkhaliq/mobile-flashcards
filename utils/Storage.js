import { AsyncStorage } from "react-native";
import { DECKS_STORAGE_KEY, QUESTION_STORAGE_KEY } from "./StorageKeys";
// Deck:
// {"title":"deck","questions":[1,2,3]}

// Question:
// { "title":'',"answer":}

export function getDeckById(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
    result = JSON.parse(result);
    if (result && result[deckId]) {
      return result[deckId];
    }
    {
      return undefined;
    }
  });
}

export function isQuestionWithSameNameInDeck(question, deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
    result = JSON.parse(result);
    if (result && result[deckId].questions[question]) {
      return result[deckId].questions[question];
    }
    {
      return undefined;
    }
  });
}

export function fetchAllDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) =>
    JSON.parse(result)
  );
}

export function addDeck(deckData) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [deckData.title]: deckData,
    })
  );
}

export function addQuestion(question, deckId, refereshDecks) {
  return Promise.all([
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((data) => {
        data = JSON.parse(data);
        let deck = data[deckId];
        deck.questions.push(question.question);
        console.log("adding new decks");
        data[deckId] = deck;
        return data;
      })
      .then((data) =>
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data), refereshDecks)
      ),
    AsyncStorage.mergeItem(
      QUESTION_STORAGE_KEY,
      JSON.stringify({
        [question.question]: question,
      })
    ),
  ]);
}

// // export function addQuestionToDeck ({ questionData, deckId }) {
// //     return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
// //       [deckId]: deckData
// //     }))
// //   }

// // export function removeEntry (key) {
// return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((results) => {
//   const data = JSON.parse(results);
//   data[key] = undefined;
//   delete data[key];
//   AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
// });
