import { transportActions } from './types'
const {
   ADD_ORIGIN_CITY,
   NO_NEED_TRANSPORT,
   SEARCHING_TRANSPORT,
   SEARCH_TRANSPORT_SUCCESS,
   SEARCH_TRANSPORT_FAIL,
   TRANSPORT_CHOSEN,
   TRANSPORT_UNCHOSEN,
} = transportActions

export const addOriginCity = text => {
   return {
      type: ADD_ORIGIN_CITY,
      payload: text
   }
}
export const noNeedTransport = () => {
   return {
      type: NO_NEED_TRANSPORT
   }
}
export const searchingTransport = () => {
   return {
      type: SEARCHING_TRANSPORT
   }
}
export const searchTransportSuccess = (arr) => {
   // arr = [transpList, places, vehicles]
   return {
      type: SEARCH_TRANSPORT_SUCCESS,
      payload: arr
   }
}
export const searchTransportFail = () => {
   return {
      type: SEARCH_TRANSPORT_FAIL
   }
}
export const transportChosen = (id, costs, currency) => {
   return {
      type: TRANSPORT_CHOSEN,
      payload: { id, costs, currency }
   }
}
export const transportUnchosen = () => {
   return {
      type: TRANSPORT_UNCHOSEN
   }
}