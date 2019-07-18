import {
   CHOOSE_MONTH,
   CHOOSE_OVERVIEW_CURRENCY
} from '../actions/types'

const INITIAL_STATE = {
   overviewMonth: "",
   overviewCurrency: ""
}
export default (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case CHOOSE_MONTH:
         return {...state, overviewMonth: action.payload}
      case CHOOSE_OVERVIEW_CURRENCY:
         return {...state, overviewCurrency: action.payload}
      default:
         return state
   }
}