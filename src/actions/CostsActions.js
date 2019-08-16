import { costsActions } from './types'
const {
   CHOOSE_CURRENCY,
   TRANSPORT_COSTS_CALCULATED,
   ACCOMMODATION_COSTS_CALCULATED,
   EVENT_FEE_CALCULATED,
   ADD_ADDITIONAL_COSTS
} = costsActions

export const chooseCurrency = cur => {
   return {
      type: CHOOSE_CURRENCY,
      payload: cur
   }
}
export const transportCostsCalculated = (cost) => {
   return {
      type: TRANSPORT_COSTS_CALCULATED,
      payload: cost
   }
}
export const accommodationCostsCalculated = (cost) => {
   return {
      type: ACCOMMODATION_COSTS_CALCULATED,
      payload: cost
   }
}
export const eventFeeCalculated = (cost) => {
   return {
      type: EVENT_FEE_CALCULATED,
      payload: cost
   }
}
export const addAdditionalCosts = cost => {
   return {
      type: ADD_ADDITIONAL_COSTS,
      payload: cost
   }
}