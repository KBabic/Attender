import {
   ADD_EVENT_NAME,
   ADD_START_DATE,
   ADD_END_DATE,
   ADD_EVENT_COUNTRY,
   ADD_EVENT_CITY,
   ADD_EVENT_CURRENCY,
   ADD_EVENT_FEE
} from '../actions/types'

// state: { events: [ {}, {}, {}, ... ], month, currency, monthlyCosts, totalCosts}
// event: { id, name, startDate, endDate, country, city, currency, ... }
const INITIAL_STATE = {
   id: "",
   name: "defaultName",
   startDate: "",
   endDate: "",
   country: "",
   city: "",
   eventCurrency: "",
   eventFee: "",
   //noNeedAccommodation: false,
   //numOfPersons: 1,
   //accommodationOption: "",
   //accommodationCosts: 0,
   //currency: "",
   //additionalCosts: 0,
   //totalCosts: 0,
   //notes: "",
   //firstDot: false,
   //secondDot: false,
   //thirdDot: false,
   //fourthDot: false
}

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case ADD_EVENT_NAME:
         return {...state, name: action.payload}
      case ADD_START_DATE:
         return {...state, startDate: action.payload}
      case ADD_END_DATE:
         return {...state, endDate: action.payload}
      case ADD_EVENT_COUNTRY:
         return {...state, country: action.payload}
      case ADD_EVENT_CITY:
         return {...state, city: action.payload}
      case ADD_EVENT_CURRENCY:
         return {...state, eventCurrency: action.payload}
      case ADD_EVENT_FEE:
         return {...state, eventFee: action.payload}
      default:
         return state
   }
}