import { currencyAPIKey } from './APIKey'
const allCurrenciesUrl = `https://free.currconv.com/api/v7/currencies?apiKey=${currencyAPIKey}`

export async function convertCurrency(cur1, cur2) {
   const url = `https://free.currconv.com/api/v7/convert?apiKey=${currencyAPIKey}&q=${cur1}_${cur2}&compact=ultra`
   let response = await fetch(url)
   let responseJson = await response.json()
   return responseJson[`${cur1}_${cur2}`]
}
export function calculateTotalCosts(arr) {
   // calculate only costs which are not strings
   if (arr.length !== 0) {
      const filtered = arr.map(el => parseFloat(el)).filter(el => !isNaN(el))
      if (filtered.length !== 0) {
         const total = filtered.reduce((a,b) => a+b)
         if (!isNaN(total)) {
            return total
         } else {
            return ""
         }
      } else {
      return ""
      }
   } else {
      return ""
   }
}