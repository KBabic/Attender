import uuid from 'uuid/v4'
import {
   SAVE_EVENT,
   DELETE_EVENT,
   UPDATE_EVENT,
   NEW_EVENT_BUTTON_PRESSED,
   EXISTING_EVENT_OPENED
} from './types'

// event: { id, name, startDate, endDate, country, city, ... }
export const saveEvent = event => {
   // create ID for the event:
   event.general.id = uuid()
   return {
      type: SAVE_EVENT,
      payload: event
   }
}
export const deleteEvent = id => {
   return {
      type: DELETE_EVENT,
      payload: id
   }
}
export const newEventButtonPressed = () => {
   return {
      type: NEW_EVENT_BUTTON_PRESSED
   }
}
export const existingEventOpened = event => {
   return {
      type: EXISTING_EVENT_OPENED,
      payload: event
   }
}
export const updateEvent = event => {
   return {
      type: UPDATE_EVENT,
      payload: event
   }
}