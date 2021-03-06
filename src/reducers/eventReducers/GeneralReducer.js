import {
   NEW_EVENT_BUTTON_PRESSED,
   EXISTING_EVENT_OPENED,
   generalActions,
} from '../../actions/types'
const { 
   ADD_EVENT_NAME,
   ADD_START_DATE,
   ADD_END_DATE,
   ADD_EVENT_COUNTRY,
   ADD_EVENT_CITY,
   NO_EVENT_FEE,
   ADD_EVENT_CURRENCY,
   ADD_EVENT_FEE
} = generalActions
const INITIAL_STATE = {
   id: "",
   eventName: "",
   startDate: "",
   endDate: "",
   eventCountry: "",
   eventCity: "",
   noFee: false,
   eventCurrency: "",
   eventFee: "",
}

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case NEW_EVENT_BUTTON_PRESSED:
         return INITIAL_STATE
      case EXISTING_EVENT_OPENED:
         // return general details for the appropriate event from state.events
         return {...state, id: action.payload.general.id, eventName: action.payload.general.eventName, startDate: action.payload.general.startDate,
         endDate: action.payload.general.endDate, eventCountry: action.payload.general.eventCountry, eventCity: action.payload.general.eventCity,
         eventCurrency: action.payload.general.eventCurrency, eventFee: action.payload.general.eventFee}
      case ADD_EVENT_NAME:
         return {...state, eventName: action.payload}
      case ADD_START_DATE:
         return {...state, startDate: action.payload}
      case ADD_END_DATE:
         return {...state, endDate: action.payload}
      case ADD_EVENT_COUNTRY:
         return {...state, eventCountry: action.payload}
      case ADD_EVENT_CITY:
         return {...state, eventCity: action.payload}
      case NO_EVENT_FEE:
         if (state.noFee) {
            return {...state, noFee: !state.noFee, eventFee: ""}
         } else {
            return {
               ...state,
               noFee: !state.noFee,
               eventCurrency: "",
               eventFee: 0
            }
         }
      case ADD_EVENT_CURRENCY:
         return {...state, eventCurrency: action.payload}
      case ADD_EVENT_FEE:
         return {...state, eventFee: action.payload}
      default:
         return state
   }
}