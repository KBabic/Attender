import {
   NEW_EVENT_BUTTON_PRESSED,
   EXISTING_EVENT_OPENED,
   costsActions,
   transportActions,
   accommodationActions,
   generalActions
} from '../../actions/types'
import { calculateTotalCosts } from '../../utils/currencyData'
const {
   CHOOSE_CURRENCY,
   TRANSPORT_COSTS_CALCULATED,
   ACCOMMODATION_COSTS_CALCULATED,
   EVENT_FEE_CALCULATED,
   ADD_ADDITIONAL_COSTS
} = costsActions
const { NO_NEED_TRANSPORT } = transportActions
const { NO_NEED_ACCOMMODATION } = accommodationActions
const { NO_EVENT_FEE } = generalActions

const INITIAL_STATE = {
   chosenCurrency: "",
   avgTransportCost: "",
   avgAccommCost: "",
   calculatedFee: "",
   additionalCosts: "",
   calculatedTotalCosts: ""
}
export default (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case NEW_EVENT_BUTTON_PRESSED:
         return INITIAL_STATE
      case EXISTING_EVENT_OPENED:
         // return costs details for the appropriate event from state.events
         return {...state, chosenCurrency: action.payload.costs.chosenCurrency, avgTransportCost: action.payload.costs.avgTransportCost,
         avgAccommCost: action.payload.costs.avgAccommCost, calculatedFee: action.payload.costs.calculatedFee, additionalCosts: action.payload.costs.additionalCosts,
         calculatedTotalCosts: action.payload.costs.calculatedTotalCosts}
      case CHOOSE_CURRENCY:
         return {
            ...state, 
            chosenCurrency: action.payload
         }
      case ADD_ADDITIONAL_COSTS:
         return {
            ...state, 
            additionalCosts: action.payload, 
            calculatedTotalCosts: calculateTotalCosts([state.avgTransportCost,state.avgAccommCost,state.calculatedFee,action.payload])}
      case TRANSPORT_COSTS_CALCULATED:
         return {
            ...state, 
            avgTransportCost: action.payload, 
            calculatedTotalCosts: calculateTotalCosts([action.payload,state.avgAccommCost,state.calculatedFee,state.additionalCosts])}
      case ACCOMMODATION_COSTS_CALCULATED:
         return {
            ...state, 
            avgAccommCost: action.payload, 
            calculatedTotalCosts: calculateTotalCosts([state.avgTransportCost,action.payload,state.calculatedFee,state.additionalCosts])}
      case EVENT_FEE_CALCULATED:
         return {
            ...state, 
            calculatedFee: action.payload, 
            calculatedTotalCosts: calculateTotalCosts([state.avgTransportCost,state.avgAccommCost,action.payload,state.additionalCosts])}
      case NO_NEED_TRANSPORT:
         return {...state, avgTransportCost: ""}
      case NO_NEED_ACCOMMODATION:
         return {...state, avgAccommCost: ""}
      case NO_EVENT_FEE:
         return {...state, calculatedFee: ""}
      default:
         return state
   }
}