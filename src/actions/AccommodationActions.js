import { accommodationActions } from './types'
const {
   NO_NEED_ACCOMMODATION,
   INCREASE_NUM_OF_PERSONS,
   DECREASE_NUM_OF_PERSONS,
   ADD_CHECKIN_DATE,
   ADD_CHECKOUT_DATE,
   SEARCHING_ACCOMMODATION,
   SEARCHING_MORE_RESULTS,
   SEARCH_ACCOMMODATION_SUCCESS,
   SEARCH_ACCOMMODATION_FAIL,
   ACCOMMODATION_CHOSEN,
   ACCOMMODATION_UNCHOSEN
} = accommodationActions

export const noNeedAccommodation = () => {
   return {
      type: NO_NEED_ACCOMMODATION
   }
}
export const increaseNumOfPersons = () => {
   return {
      type: INCREASE_NUM_OF_PERSONS
   }
}
export const decreaseNumOfPersons = () => {
   return {
      type: DECREASE_NUM_OF_PERSONS
   }
}
export const addCheckinDate = date => {
   return {
      type: ADD_CHECKIN_DATE,
      payload: date
   }
}
export const addCheckoutDate = date => {
   return {
      type: ADD_CHECKOUT_DATE,
      payload: date
   }
}
export const searchingAccommodation = () => {
   return {
      type: SEARCHING_ACCOMMODATION
   }
}
export const searchingMoreResults = () => {
   return {
      type: SEARCHING_MORE_RESULTS
   }
}
export const searchAccommodationSuccess = ([properties, hotelsList]) => {
   return {
      type: SEARCH_ACCOMMODATION_SUCCESS,
      payload: [properties, hotelsList]
   }
}
export const searchAccommodationFail = () => {
   return {
      type: SEARCH_ACCOMMODATION_FAIL
   }
   // add error handling
}
export const accommodationChosen = (accommOption) => {
   return {
      type: ACCOMMODATION_CHOSEN,
      payload: accommOption
   }
}
export const accommodationUnchosen = () => {
   return {
      type: ACCOMMODATION_UNCHOSEN
   }
}