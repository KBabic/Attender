import { combineReducers } from 'redux'
import eventReducers from './eventReducers'
import AvgMonthlyReducer from './AvgMonthlyReducer'
import OverviewReducer from './OverviewReducer'
import EventsReducer from './EventsReducer'
import SelectedEventsReducer from './SelectedEventsReducer'

export default combineReducers({
   overview: OverviewReducer,
   avgMonthlyCosts: AvgMonthlyReducer,
   events: EventsReducer,
   currentEvent: eventReducers,
   selectedEvents: SelectedEventsReducer
})