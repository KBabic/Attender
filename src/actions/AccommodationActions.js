import {
   NO_NEED_ACCOMMODATION,
   INCREASE_NUM_OF_PERSONS,
   DECREASE_NUM_OF_PERSONS,
   ADD_CHECKIN_DATE,
   ADD_CHECKOUT_DATE,
   SEARCHING_ACCOMMODATION,
   SEARCH_ACCOMMODATION_SUCCESS,
   SEARCH_ACCOMMODATION_FAIL,
   ACCOMMODATION_CHOSEN,
   ACCOMMODATION_UNCHOSEN
} from './types'

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
export const searchAccommodationSuccess = (listOfAccommOptions) => {
   return {
      type: SEARCH_ACCOMMODATION_SUCCESS,
      payload: listOfAccommOptions
   }
}
export const searchAccommodationFail = () => {
   return {
      type: SEARCH_ACCOMMODATION_FAIL
   }
   // add error handling
}
export const fetchingAccommodationDetails = () => {
   return {
      type: FETCHING_ACCOMMODATION_DETAILS
   }
}
export const fetchAccommDetailsSuccess = () => {
   return {
      type: FETCH_ACCOMMODATION_DETAILS_SUCCESS
   }
}
export const fetchAccommDetailsFail = () => {
   return {
      type: FETCH_ACCOMMODATION_DETAILS_FAIL
   }
}
export const accommodationChosen = (id, costs) => {
   return {
      type: ACCOMMODATION_CHOSEN,
      payload: { id, costs }
   }
}
export const accommodationUnchosen = () => {
   return {
      type: ACCOMMODATION_UNCHOSEN
   }
}