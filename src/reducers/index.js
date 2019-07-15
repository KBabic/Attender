import { combineReducers } from 'redux'
import EventReducer from './EventReducer'
import TransportReducer from './TransportReducer'
import AccommodationReducer from './AccommodationReducer'

export default combineReducers({
   event: EventReducer,
   transport: TransportReducer,
   accommodation: AccommodationReducer
})