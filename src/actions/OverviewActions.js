import { Alert } from 'react-native'
import {
   CHOOSE_MONTH,
   CHOOSE_OVERVIEW_CURRENCY,
   TOTAL_MONTHLY_COSTS_CALCULATED,
   AVERAGE_MONTHLY_COSTS_CALCULATED,
} from './types'
import { months } from '../utils/months'
import { convertCurrency } from '../utils/currencyData'
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
export const totalMonthlyCostsCalculated = (events, month, currency) => {
   return async dispatch => {
      let filteredEvents = []
      let totalCosts = 0
      if (month === "All") {
         filteredEvents = Object.values(events)
      } else {
         // 1. pick only those events that start within the chosen month and that have chosenCurrency and totalCosts specified!
         for (let val of Object.values(events)) {
            const index = parseInt(val.general.startDate.slice(5,7)) - 1 // 0 for Jan, 1 for Feb,...
            const year = val.general.startDate.slice(0,4)
            if ((months[index] + " " + year === month) && val.costs.chosenCurrency && val.costs.calculatedTotalCosts) {
               filteredEvents.push(val)
            }
         }  
      }
      if (filteredEvents.length === 0) {
         Alert.alert("Error", "There are no events in the chosen month.", [{text: "OK"}])
         dispatch({type: TOTAL_MONTHLY_COSTS_CALCULATED, payload: "" })
      } else {
         // 2. map through filtered list of events, convert the currency and recalculate total costs
         // 3. summarize the costs and dispatch the action
         for (let ev of filteredEvents) {
            const cur = ev.costs.chosenCurrency
            const cost = ev.costs.calculatedTotalCosts
            const factor = await convertCurrency(cur, currency)
            if (factor) {
               const newCost = await cost * factor
               totalCosts = totalCosts + newCost
            } else {
               Alert.alert("Error", "Error in conversion happened. The server might be temporarily unavailable or your credentials might be inaccurate.",[{text: "OK"}])
               dispatch({type: TOTAL_MONTHLY_COSTS_CALCULATED, payload: "" })
               break
            }
         }
         totalCosts > 0 ? 
         dispatch({type: TOTAL_MONTHLY_COSTS_CALCULATED, payload: Math.round(totalCosts) }) :
         dispatch({type: TOTAL_MONTHLY_COSTS_CALCULATED, payload: "" })
      }
   }
}
export const avgMonthlyCostsCalculated = (events, currency) => {
   // calculate average amount of all events total costs
   // count how many different months appear
   // convert all currencies and sum all total costs
   // divide total costs with the number of months
   return async dispatch => {
      let totalCosts = 0
      let monthCount = []
      if (events.length === 0) {
         dispatch({type: AVERAGE_MONTHLY_COSTS_CALCULATED, payload: "" })
      } else {
         for (let ev of Object.values(events)) {
            // evMonth is for example "Sep 2019"
            const evMonth = months[parseInt(ev.general.startDate.slice(5,7)) - 1] + " " + ev.general.startDate.slice(0,4)
            if (!monthCount.includes(evMonth)) {
               monthCount.push(evMonth)
            }
            const cur = ev.costs.chosenCurrency
            const cost = ev.costs.calculatedTotalCosts
            const factor = await convertCurrency(cur, currency)
            if (factor) {
               const newCost = await cost * factor
               totalCosts = totalCosts + newCost
            } else {
               Alert.alert("Error", "Error in conversion happened. The server might be temporarily unavailable or your credentials might be inaccurate.",[{text: "OK"}])
               dispatch({type: AVERAGE_MONTHLY_COSTS_CALCULATED, payload: "" })
               break
            }
         }
         const avg = Math.round(totalCosts / monthCount.length)
         avg > 0 ? dispatch({type: AVERAGE_MONTHLY_COSTS_CALCULATED, payload: avg }) :
         dispatch({type: AVERAGE_MONTHLY_COSTS_CALCULATED, payload: "" })
      }
   }
}