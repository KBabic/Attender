import {
   EVENT_CHECKED,
   EVENT_UNCHECKED,
   SAVE_EVENT,
   DELETE_EVENT
} from '../actions/types'
const INITIAL_STATE = []
export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case SAVE_EVENT:
         if (!state.includes(action.payload.general.id)) {
            return [...state, action.payload.general.id]
         } else {
            return state
         }         
      case DELETE_EVENT:
         return state.filter(el => el !== action.payload)
      case EVENT_CHECKED:
         if (!state.includes(action.payload)) {
            return [...state, action.payload]
         } else {
            return state
         }
      case EVENT_UNCHECKED:
         return state.filter(el => el !== action.payload)
      default:
         return state
   }
}