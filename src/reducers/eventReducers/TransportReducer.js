import { 
   transportActions,
   NEW_EVENT_BUTTON_PRESSED,
   EXISTING_EVENT_OPENED, 
} from '../../actions/types'
const {
   ADD_ORIGIN_CITY,
   NO_NEED_TRANSPORT,
   SEARCHING_TRANSPORT,
   SEARCH_TRANSPORT_SUCCESS,
   SEARCH_TRANSPORT_FAIL,
   TRANSPORT_CHOSEN,
   TRANSPORT_UNCHOSEN,
} = transportActions

const INITIAL_STATE = {
   transportLoading: false,
   noTransport: false,
   originCity: "",
   transportOptions: [],
   chosenTransportOptionId: "",
   transportCosts: 0,
   transpCurrency: ""
}
export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case NEW_EVENT_BUTTON_PRESSED:
         return INITIAL_STATE
      case EXISTING_EVENT_OPENED:
         // return transport details for the appropriate event from state.events
         return {...state, transportLoading: action.payload.transport.transportLoading, noTransport: action.payload.transport.noTransport,
         originCity: action.payload.transport.originCity, transportOptions: action.payload.transport.transportOptions,
         chosenTransportOptionId: action.payload.transport.chosenTransportOptionId, transportCosts: action.payload.transport.transportCosts,
         transpCurrency: action.payload.transport.transpCurrency}
      case ADD_ORIGIN_CITY:
         return {...state, originCity: action.payload}
      case NO_NEED_TRANSPORT:
         if (state.noTransport) {
            return {...state, noTransport: !state.noTransport}
         } else {
            return {
               ...state, 
               noTransport: !state.noTransport,
               originCity: INITIAL_STATE.originCity, 
               transportOptions: INITIAL_STATE.transportOptions, 
               chosenTransportOptionId: INITIAL_STATE.chosenTransportOptionId,
               transportCosts: INITIAL_STATE.transportCosts,
               transpCurrency: INITIAL_STATE.transpCurrency
            }
         }
      case SEARCHING_TRANSPORT:
         return {
            ...state, 
            transportLoading: true, 
            transportOptions: INITIAL_STATE.transportOptions, 
            chosenTransportOptionId: INITIAL_STATE.chosenTransportOptionId,
            transportCosts: INITIAL_STATE.transportCosts,
            transpCurrency: INITIAL_STATE.transpCurrency
         }
      case SEARCH_TRANSPORT_SUCCESS:
         return {...state, transportLoading: false, transportOptions: [...state.transportOptions, ...action.payload]}
      case SEARCH_TRANSPORT_FAIL:
         return {...state, transportLoading: false}
         case TRANSPORT_CHOSEN:
         return {
            ...state, 
            chosenTransportOptionId: action.payload.id, 
            transportCosts: action.payload.costs, 
            transpCurrency: action.payload.currency
         }
      case TRANSPORT_UNCHOSEN:
         return {...state, chosenTransportOptionId: "", transportCosts: 0, transpCurrency: ""}
      default:
         return state
   }
}