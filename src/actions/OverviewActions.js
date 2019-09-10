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
export const totalMonthlyCostsCalculated = (events, selected, month, currency) => {
   return async dispatch => {
      console.log('total is now being called')
      console.log('selected are ', selected)
      console.log('month is ', month)
      console.log('currency is ', currency)
      let selectedEvents = []
      let filteredEvents = []
      let totalCosts = 0
      // grab only events whose IDs are among selected:
      for (let i = 0; i < selected.length; i++) {
         selectedEvents.push(events[selected[i]])
      }
      console.log('selected events are ', selectedEvents)
      if (month !== "All") {
         // pick only those events that start within the chosen month and that have chosenCurrency and totalCosts specified!
         for (let event of selectedEvents) {
            const index = parseInt(event.general.startDate.slice(5,7)) - 1 // 0 for Jan, 1 for Feb,...
            const year = event.general.startDate.slice(0,4)
            if ((months[index] + " " + year === month) && event.costs.chosenCurrency && event.costs.calculatedTotalCosts) {
               filteredEvents.push(event)
            }
         }
      } else {
         filteredEvents = [...selectedEvents]
      }
      console.log('filtered events are ', filteredEvents)

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
         console.log('total costs are ', totalCosts)
         totalCosts > 0 ? 
         dispatch({type: TOTAL_MONTHLY_COSTS_CALCULATED, payload: Math.round(totalCosts) }) :
         dispatch({type: TOTAL_MONTHLY_COSTS_CALCULATED, payload: "" })
      }
   }
}
export const avgMonthlyCostsCalculated = (events, selected, currency) => {
   // calculate average amount of all events total costs
   // count how many different months appear
   // convert all currencies and sum all total costs
   // divide total costs with the number of months
   return async dispatch => {
      let totalCosts = 0
      let monthCount = []
      let selectedEvents = []
      for (let i = 0; i < selected.length; i++) {
         selectedEvents.push(events[selected[i]])
      }
      if (selectedEvents.length === 0) {
         dispatch({type: AVERAGE_MONTHLY_COSTS_CALCULATED, payload: "" })
      } else {
         for (let event of selectedEvents) {
            // evMonth is for example "Sep 2019"
            const evMonth = months[parseInt(event.general.startDate.slice(5,7)) - 1] + " " + event.general.startDate.slice(0,4)
            if (!monthCount.includes(evMonth)) {
               monthCount.push(evMonth)
            }
            const cur = event.costs.chosenCurrency
            const cost = event.costs.calculatedTotalCosts
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