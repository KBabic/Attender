import { combineReducers } from 'redux'
import GeneralReducer from './GeneralReducer'
import TransportReducer from './TransportReducer'
import AccommodationReducer from './AccommodationReducer'
import CostsReducer from './CostsReducer'
import NotesReducer from './NotesReducer'

export default combineReducers({
   general: GeneralReducer,
   transport: TransportReducer,
   accommodation: AccommodationReducer,
   costs: CostsReducer,
   notes: NotesReducer
})