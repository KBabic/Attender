import {
   NEW_EVENT_BUTTON_PRESSED,
   EXISTING_EVENT_EDITED,
   ADD_NOTES
} from '../../actions/types'

const INITIAL_STATE = {
   notes: ""
}
export default (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case NEW_EVENT_BUTTON_PRESSED:
         return state
      case EXISTING_EVENT_EDITED:
         return {...state, notes: action.payload.notes.notes}
      case ADD_NOTES:
         return {...state, notes: action.payload}
      default:
         return state
   }
}