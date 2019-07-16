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
} from '../actions/types'

const INITIAL_STATE = {
   accommodationLoading: false,
   noAccommodation: false,
   numOfPersons: 1,
   checkInDate: "",
   checkOutDate: "",
   accommodationOptions: [],
   chosenAccommOptionId: "",
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
      case SEARCHING_ACCOMMODATION:
         return {...state, accommodationLoading: true}
      case SEARCH_ACCOMMODATION_SUCCESS:
         return {...state, accommodationLoading: false, accommodationOptions: [...state.accommodationOptions, action.payload]}
      case ACCOMMODATION_CHOSEN:
         console.log('chosen accomm option id is ', action.payload.id)
         console.log('accomm costs are now ', action.payload.costs)
         return {...state, chosenAccommOptionId: action.payload.id, accommodationCosts: action.payload.costs}
      case ACCOMMODATION_UNCHOSEN:
         return {...state, chosenAccommOptionId: "", accommodationCosts: 0}
      case SEARCH_ACCOMMODATION_FAIL:
         return {...state, accommodationLoading: false}
         // add error handling
      default:
         return state
   }
}