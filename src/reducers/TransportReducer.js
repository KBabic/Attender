import {
   ADD_ORIGIN_CITY,
   NO_NEED_TRANSPORT,
   SEARCHING_TRANSPORT,
   SEARCH_TRANSPORT_SUCCESS,
   SEARCH_TRANSPORT_FAIL,
   TRANSPORT_CHOSEN,
   TRANSPORT_UNCHOSEN,
} from '../actions/types'

const INITIAL_STATE = {
   transportLoading: false,
   noTransport: false,
   originCity: "",
   transportOptions: [],
   chosenTransportOptionId: "",
   transportCosts: 0,
}
export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case ADD_ORIGIN_CITY:
         return {...state, originCity: action.payload}
      case NO_NEED_TRANSPORT:
         return {...state, noTransport: !state.noTransport}
      case SEARCHING_TRANSPORT:
         return {...state, transportLoading: true}
      case SEARCH_TRANSPORT_SUCCESS:
         return {...state, transportLoading: false, transportOptions: [...state.transportOptions, ...action.payload]}
      case TRANSPORT_CHOSEN:
         console.log('chosen option id is ', action.payload.id)
         console.log('transp costs are now ', action.payload.costs)
         return {...state, chosenTransportOptionId: action.payload.id, transportCosts: action.payload.costs}
      case TRANSPORT_UNCHOSEN:
         console.log('transp costs are now', INITIAL_STATE.transportCosts)
         return {...state, chosenTransportOptionId: "", transportCosts: 0}
      case SEARCH_TRANSPORT_FAIL:
         return {...state, transportLoading: false}
         // add error handling
      default:
         return state
   }
}