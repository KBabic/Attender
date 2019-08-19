import {
   NEW_EVENT_BUTTON_PRESSED,
   EXISTING_EVENT_OPENED,
   accommodationActions
} from '../../actions/types'
const {
   NO_NEED_ACCOMMODATION,
   INCREASE_NUM_OF_PERSONS,
   DECREASE_NUM_OF_PERSONS,
   ADD_CHECKIN_DATE,
   ADD_CHECKOUT_DATE,
   SEARCHING_ACCOMMODATION,
   SEARCH_ACCOMMODATION_SUCCESS,
   SEARCH_ACCOMMODATION_FAIL,
   FETCHING_ACCOMMODATION_DETAILS,
   FETCH_ACCOMMODATION_DETAILS_SUCCESS,
   FETCH_ACCOMMODATION_DETAILS_FAIL,
   ACCOMMODATION_CHOSEN,
   ACCOMMODATION_UNCHOSEN
} = accommodationActions

const INITIAL_STATE = {
   accommodationLoading: false,
   accommDetailsLoading: false,
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
      case NEW_EVENT_BUTTON_PRESSED:
         return state
      case EXISTING_EVENT_OPENED:
         // return accommodation details for the appropriate event from state.events
         return {...state, accommodationLoading: action.payload.accommodation.accommodationLoading, accommDetailsLoading: action.payload.accommodation.accommDetailsLoading,
         noAccommodation: action.payload.accommodation.noAccommodation, numOfPersons: action.payload.accommodation.numOfPersons, checkInDate: action.payload.accommodation.checkInDate,
         checkOutDate: action.payload.accommodation.checkOutDate, accommodationOptions: action.payload.accommodation.accommodationOptions,
         chosenAccommOptionId: action.payload.accommodation.chosenAccommOptionId, accommodationCosts: action.payload.accommodation.accommodationCosts}
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
         return {...state, accommodationLoading: false, accommodationOptions: [...state.accommodationOptions, ...action.payload]}
      case SEARCH_ACCOMMODATION_FAIL:
         return {...state, accommodationLoading: false}
         // add error handling
      case FETCHING_ACCOMMODATION_DETAILS:
         return {...state, accommDetailsLoading: true}
      case FETCH_ACCOMMODATION_DETAILS_SUCCESS:
         return {...state, accommDetailsLoading: false}
      case FETCH_ACCOMMODATION_DETAILS_FAIL:
         return {...state, accommDetailsLoading: false}
         // add errror handling
      case ACCOMMODATION_CHOSEN:
         return {...state, chosenAccommOptionId: action.payload.id, accommodationCosts: action.payload.costs}
      case ACCOMMODATION_UNCHOSEN:
         return {...state, chosenAccommOptionId: "", accommodationCosts: 0}
      default:
         return state
   }
}