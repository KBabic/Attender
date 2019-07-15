import {
   NO_NEED_ACCOMMODATION,
   INCREASE_NUM_OF_PERSONS,
   DECREASE_NUM_OF_PERSONS,
   ADD_CHECKIN_DATE,
   ADD_CHECKOUT_DATE,
   SEARCH_ACCOMMODATION_SUCCESS,
   SEARCH_ACCOMMODATION_FAIL,
   ACCOMMODATION_CHOSEN
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