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
      case EVENT_CHECKED:
         if (!state.includes(action.payload.general.id)) {
            return [...state, action.payload.general.id]
         } else {
            return state
         }         
      case DELETE_EVENT:
      case EVENT_UNCHECKED:
         const newState = state.filter(el => el !== action.payload.id)
         return newState
      default:
         return state
   }
}