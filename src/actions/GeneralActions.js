import { generalActions } from './types'
const {
   ADD_EVENT_NAME,
   ADD_EVENT_COUNTRY,
   ADD_EVENT_CITY,
   ADD_EVENT_CURRENCY,
   ADD_EVENT_FEE,
   ADD_START_DATE,
   ADD_END_DATE
} = generalActions

export const addEventName = text => {
   return {
      type: ADD_EVENT_NAME,
      payload: text
   }
}
export const addEventCountry = text => {
   return {
      type: ADD_EVENT_COUNTRY,
      payload: text
   }
}
export const addEventCity = text => {
   return {
      type: ADD_EVENT_CITY,
      payload: text
   }
}
export const addEventCurrency = cur => {
   return {
      type: ADD_EVENT_CURRENCY,
      payload: cur
   }
}
export const addEventFee = amount => {
   return {
      type: ADD_EVENT_FEE,
      payload: amount
   }
}
export const addStartDate = date => {
   return {
      type: ADD_START_DATE,
      payload: date
   }
}
export const addEndDate = date => {
   return {
      type: ADD_END_DATE,
      payload: date
   }
}