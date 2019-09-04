import {
   CHOOSE_MONTH, 
   CHOOSE_OVERVIEW_CURRENCY,
   TOTAL_MONTHLY_COSTS_CALCULATED
} from '../actions/types'
const INITIAL_STATE = {
   month: "",
   currency: "",
   costs: ""
}
export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case CHOOSE_MONTH:
         return {...state, month: action.payload}
      case CHOOSE_OVERVIEW_CURRENCY:
         return {...state, currency: action.payload}
      case TOTAL_MONTHLY_COSTS_CALCULATED:
         return {...state, costs: action.payload}
      default:
         return state
   }
}