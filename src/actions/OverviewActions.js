import {
   CHOOSE_MONTH,
   CHOOSE_OVERVIEW_CURRENCY,
   TOTAL_MONTHLY_COSTS_CALCULATED,
   AVERAGE_MONTHLY_COSTS_CALCULATED,
} from './types'
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
export const totalMonthlyCostsCalculated = events => {
   // sumarize all events total costs for a chosen month
   
   return {
      type: TOTAL_MONTHLY_COSTS_CALCULATED,
      // payload: total amount
   }
}
export const avgMonthlyCostsCalculated = events => {
   // calculate average amount from all events total costs

   return {
      type: AVERAGE_MONTHLY_COSTS_CALCULATED,
      //payload: average amount
   }
}