import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, QUESTION_STORAGE_KEY } from './StorageKeys';
// Deck:
// {"title":"deck","questions":[1,2,3]}

// Question:
// {"id":1, "title":'',"answer":}


export function isDeckWithSameName( title ) { 
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
        result = JSON.parse(result);
        console.log();
        if(result && result[title])
        {
            return result[title];
         }
         {
            return undefined;
         } 
    });
}

export function fetchAllDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => JSON.parse(result))
}

export function addDeck( deckData) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deckData.title]: deckData
    }))
}

// export function addQuestionToDeck ({ questionData, deckId }) {
//     return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
//       [deckId]: deckData
//     }))
//   }

// export function removeEntry (key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })