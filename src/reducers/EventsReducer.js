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
         startDate: "2019-08-16",
         endDate: "2019-08-18",
         eventCountry: "Serbia",
         eventCity: "Belgrade",
         eventCurrency: "RSD",
         eventFee: 6000,
      },
      transport: {
         transportLoading: false,
         noTransport: false,
         originCity: "",
         transportOptions: [],
         chosenTransportOptionId: "",
         transportCosts: 0,
      },
      accommodation: {
         accommodationLoading: false,
         accommDetailsLoading: false,
         noAccommodation: false,
         numOfPersons: 3,
         checkInDate: "",
         checkOutDate: "",
         accommodationOptions: [],
         chosenAccommOptionId: "",
         accommodationCosts: 0
      },
      costs: {
         chosenCurrency: "EUR",
         avgTransportCost: 80,
         avgAccommCost: 70,
         calculatedFee: 80,
         additionalCosts: 50,
         calculatedTotalCosts: 280
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
      },
      accommodation: {
         accommodationLoading: false,
         accommDetailsLoading: false,
         noAccommodation: false,
         numOfPersons: 1,
         checkInDate: "",
         checkOutDate: "",
         accommodationOptions: [],
         chosenAccommOptionId: "",
         accommodationCosts: 0
      },
      costs: {
         chosenCurrency: "USD",
         avgTransportCost: 90,
         avgAccommCost: 70,
         calculatedFee: 80,
         additionalCosts: 50,
         calculatedTotalCosts: 290
      },
      notes: {
         notes: ""
      }
   }
}
export default (state = INITIAL_STATE, action) => {
   if (action.type === SAVE_EVENT) {
      return {...state, [action.payload.general.id]: action.payload}
   } else if (action.type === DELETE_EVENT) {
      // delete event
   } else if (action.type === UPDATE_EVENT) {
      return {...state, [action.payload.general.id]: action.payload}
   } else {
      return state
   }
}