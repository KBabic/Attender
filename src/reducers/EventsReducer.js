import {
   SAVE_EVENT, 
   DELETE_EVENT,
   UPDATE_EVENT 
} from '../actions/types'
const INITIAL_STATE = {
   1: {
      general: {
         id: 1,
         eventName: "event1",
         startDate: "",
         endDate: "",
         eventCountry: "Serbia",
         eventCity: "Belgrade",
         eventCurrency: "",
         eventFee: 0,
      },
      transport: {
         transportLoading: false,
         noTransport: false,
         originCity: "",
         transportOptions: [],
         chosenTransportOptionId: "",
         transportCosts: 0,
         transpCurrency : ""
      },
      accommodation: {
         accommodationLoading: false,
         noAccommodation: false,
         numOfPersons: 3,
         checkInDate: "",
         checkOutDate: "",
         accommodationOptions: [],
         chosenAccommOptionId: "",
         accommodationCosts: 0,
         accommodationCurrency: ""
      },
      costs: {
         chosenCurrency: "",
         avgTransportCost: 0,
         avgAccommCost: 0,
         calculatedFee: 0,
         additionalCosts: 0,
         calculatedTotalCosts: 0
      },
      notes: {
         notes: "Notes for the first event"
      }
   },
   2: {
      general: {
         id: 2,
         eventName: "event2",
         startDate: "2019-08-26",
         endDate: "2019-08-28",
         eventCountry: "",
         eventCity: "",
         eventCurrency: "",
         eventFee: 0,
      },
      transport: {
         transportLoading: false,
         noTransport: false,
         originCity: "",
         transportOptions: [],
         chosenTransportOptionId: "",
         transportCosts: 0,
         transpCurrency: ""
      },
      accommodation: {
         accommodationLoading: false,
         noAccommodation: false,
         numOfPersons: 1,
         checkInDate: "",
         checkOutDate: "",
         accommodationOptions: [],
         chosenAccommOptionId: "",
         accommodationCosts: 0,
         accommodationCurrency: ""
      },
      costs: {
         chosenCurrency: "",
         avgTransportCost: 0,
         avgAccommCost: 0,
         calculatedFee: 0,
         additionalCosts: 0,
         calculatedTotalCosts: 0
      },
      notes: {
         notes: ""
      }
   }
}
export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case SAVE_EVENT:
         return {...state, [action.payload.general.id]: action.payload}
      case DELETE_EVENT:
         // delete event
         return state
      case UPDATE_EVENT:
         if (state[action.payload.general.id]) {
            return {...state, [action.payload.general.id]: action.payload}
         } else {
            return state
         }
      default:
         return state
   }
}