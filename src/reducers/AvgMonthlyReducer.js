import { AVERAGE_MONTHLY_COSTS_CALCULATED } from '../actions/types'
export default (state = { avg: "" }, action) => {
   switch(action.type) {
      case AVERAGE_MONTHLY_COSTS_CALCULATED:
         return {avg: action.payload}
      default:
         return state
   }
}