import {
   CHOOSE_CURRENCY,
   TRANSPORT_COSTS_CALCULATED,
   ACCOMMODATION_COSTS_CALCULATED,
   EVENT_FEE_CALCULATED,
   ADD_ADDITIONAL_COSTS
} from './types'

export const chooseCurrency = cur => {
   return {
      type: CHOOSE_CURRENCY,
      payload: cur
   }
}
export const transportCostsCalculated = () => {
   return {
      type: TRANSPORT_COSTS_CALCULATED
   }
}
export const accommodationCostsCalculated = () => {
   return {
      type: ACCOMMODATION_COSTS_CALCULATED
   }
}
export const eventFeeCalculated = () => {
   return {
      type: EVENT_FEE_CALCULATED
   }
}
export const addAdditionalCosts = cost => {
   return {
      type: ADD_ADDITIONAL_COSTS,
      payload: cost
   }
}