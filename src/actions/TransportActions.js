import {
   ADD_ORIGIN_CITY,
   NO_NEED_TRANSPORT,
   SEARCH_TRANSPORT_SUCCESS,
   SEARCH_TRANSPORT_FAIL,
   TRANSPORT_CHOSEN
} from './types'

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