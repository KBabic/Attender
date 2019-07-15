import {
   ADD_ORIGIN_CITY,
   NO_NEED_TRANSPORT,
} from '../actions/types'

const INITIAL_STATE = {
   noTransport: false,
   originCity: "",
   transportOption: "",
   transportCosts: 0,
}
export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case ADD_ORIGIN_CITY:
         console.log('Add origin city: ', action.payload)
         return {...state, originCity: action.payload}
      case NO_NEED_TRANSPORT:
         console.log(state.noTransport, !state.noTransport)
         return {...state, noTransport: !state.noTransport}
      default:
         return state
   }
}