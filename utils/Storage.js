import { AsyncStorage } from "react-native";
import { DECKS_STORAGE_KEY, QUESTION_STORAGE_KEY } from "./StorageKeys";
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
        console.log("adding new decks");
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
