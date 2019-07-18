import {
   CHOOSE_CURRENCY,
   TRANSPORT_COSTS_CALCULATED,
   ACCOMMODATION_COSTS_CALCULATED,
   EVENT_FEE_CALCULATED,
   ADD_ADDITIONAL_COSTS
} from '../actions/types'

const INITIAL_STATE = {
   chosenCurrency: ""
}
export default (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case CHOOSE_CURRENCY:
         return {...state, chosenCurrency: action.payload}
      default:
         return state
   }
}