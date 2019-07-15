import {
   NO_NEED_ACCOMMODATION,
   INCREASE_NUM_OF_PERSONS,
   DECREASE_NUM_OF_PERSONS,
   ADD_CHECKIN_DATE,
   ADD_CHECKOUT_DATE,
} from '../actions/types'

const INITIAL_STATE = {
   noAccommodation: false,
   numOfPersons: 1,
   checkInDate: "",
   checkOutDate: "",
   accommodationOption: "",
   accommodationCosts: 0
}
export default (state=INITIAL_STATE, action) => {
   switch (action.type) {
      case NO_NEED_ACCOMMODATION:
         return {...state, noAccommodation: !state.noAccommodation}
      case INCREASE_NUM_OF_PERSONS:
         return {...state, numOfPersons: state.numOfPersons + 1}
      case DECREASE_NUM_OF_PERSONS:
         return {...state, numOfPersons: state.numOfPersons > 1 ? state.numOfPersons - 1 : 1}
      case ADD_CHECKIN_DATE:
         return {...state, checkInDate: action.payload}
      case ADD_CHECKOUT_DATE:
         return {...state, checkOutDate: action.payload}
      default:
         return state
   }
}