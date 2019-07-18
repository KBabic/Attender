import { combineReducers } from 'redux'
import EventReducer from './EventReducer'
import TransportReducer from './TransportReducer'
import AccommodationReducer from './AccommodationReducer'
import CostsReducer from './CostsReducer'
import EventListReducer from './EventListReducer'

export default combineReducers({
   event: EventReducer,
   transport: TransportReducer,
   accommodation: AccommodationReducer,
   costs: CostsReducer,
   overview: EventListReducer
})