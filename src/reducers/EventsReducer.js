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
         startDate: "2019-09-05",
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
         destinationCity: "",
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
         chosenCurrency: "CHF",
         avgTransportCost: 0,
         avgAccommCost: 0,
         calculatedFee: 0,
         additionalCosts: 0,
         calculatedTotalCosts: 100
      },
      notes: {
         notes: "Notes for the first event"
      }
   },
   2: {
      general: {
         id: 2,
         eventName: "event2",
         startDate: "2019-09-26",
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
         destinationCity: "",
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
         chosenCurrency: "CHF",
         avgTransportCost: 0,
         avgAccommCost: 0,
         calculatedFee: 0,
         additionalCosts: 0,
         calculatedTotalCosts: 60
      },
      notes: {
         notes: ""
      }
   },
   3: {
      general: {
         id: 3,
         eventName: "event3",
         startDate: "2019-10-26",
         endDate: "2019-10-28",
         eventCountry: "",
         eventCity: "",
         eventCurrency: "",
         eventFee: 0,
      },
      transport: {
         transportLoading: false,
         noTransport: false,
         originCity: "",
         destinationCity: "",
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
         chosenCurrency: "CHF",
         avgTransportCost: 0,
         avgAccommCost: 0,
         calculatedFee: 0,
         additionalCosts: 0,
         calculatedTotalCosts: 60
      },
      notes: {
         notes: ""
      }
   }
}
export default (state = {}, action) => {
   switch(action.type) {
      case SAVE_EVENT:
         if (!state[action.payload.general.id]) {
            return {...state, [action.payload.general.id]: action.payload}
         } else {
            return state
         }
      case DELETE_EVENT:
         // delete event
         const newState = {}
         for (let key of Object.keys(state)) {
            if (key !== action.payload) {
               newState[key] = state[key]
            }
         }
         return newState
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