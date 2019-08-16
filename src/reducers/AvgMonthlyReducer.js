import { AVERAGE_MONTHLY_COSTS_CALCULATED } from '../actions/types'
const INITIAL_STATE = {
   averageMonthlyCosts: 0
}
export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case AVERAGE_MONTHLY_COSTS_CALCULATED:
         return {...state, averageMonthlyCosts: action.payload}
      default:
         return state
   }
}