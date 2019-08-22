import {
   NEW_EVENT_BUTTON_PRESSED,
   EXISTING_EVENT_OPENED,
   costsActions
} from '../../actions/types'
const {
   CHOOSE_CURRENCY,
   TRANSPORT_COSTS_CALCULATED,
   ACCOMMODATION_COSTS_CALCULATED,
   EVENT_FEE_CALCULATED,
   ADD_ADDITIONAL_COSTS,
   TOTAL_EVENT_COSTS_CALCULATED
} = costsActions

const INITIAL_STATE = {
   chosenCurrency: "",
   avgTransportCost: 0,
   avgAccommCost: 0,
   calculatedFee: 0,
   additionalCosts: 0,
   calculatedTotalCosts: 0
}
export default (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case NEW_EVENT_BUTTON_PRESSED:
         return state
      case EXISTING_EVENT_OPENED:
         // return costs details for the appropriate event from state.events
         return {...state, chosenCurrency: action.payload.costs.chosenCurrency, avgTransportCost: action.payload.costs.avgTransportCost,
         avgAccommCost: action.payload.costs.avgAccommCost, calculatedFee: action.payload.costs.calculatedFee, additionalCosts: action.payload.costs.additionalCosts,
         calculatedTotalCosts: action.payload.costs.calculatedTotalCosts}
      case CHOOSE_CURRENCY:
         return {...state, chosenCurrency: action.payload}
      case TRANSPORT_COSTS_CALCULATED:
         return {...state, avgTransportCost: action.payload}
      case ACCOMMODATION_COSTS_CALCULATED:
         return {...state, avgAccommCost: action.payload}
      case EVENT_FEE_CALCULATED:
         return {...state, calculatedFee: action.payload}
      case ADD_ADDITIONAL_COSTS:
         return {...state, additionalCosts: action.payload}
      case TOTAL_EVENT_COSTS_CALCULATED:
         return {...state, calculatedTotalCosts: action.payload}
      default:
         return state
   }
}