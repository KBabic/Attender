import uuid from 'uuid/v4'
import {
   SAVE_EVENT,
   DELETE_EVENT,
   CHOOSE_MONTH,
   CHOOSE_OVERVIEW_CURRENCY
} from './types'

// event: { id, name, startDate, endDate, country, city, currency, fee, transportCosts, accommodationCosts, totalCosts }
export const saveEvent = event => {
   // create ID for the event:
   event.id = uuid()
   return {
      type: SAVE_EVENT,
      payload: event
   }
}
// not sure if deleteEvent will have payload
export const deleteEvent = event => {
   return {
      type: DELETE_EVENT,
   }
}
export const chooseMonth = month => {
   return {
      type: CHOOSE_MONTH,
      payload: month
   }
}
export const chooseOverviewCurrency = cur => {
   return {
      type: CHOOSE_OVERVIEW_CURRENCY,
      payload: cur
   }
}