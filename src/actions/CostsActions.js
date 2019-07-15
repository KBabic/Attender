import {
   CHOOSE_CURRENCY,
   ADD_ADDITIONAL_COSTS
} from './types'

export const chooseCurrency = cur => {
   return {
      type: CHOOSE_CURRENCY,
      payload: cur
   }
}
export const addAdditionalCosts = cost => {
   return {
      type: ADD_ADDITIONAL_COSTS,
      payload: cost
   }
}