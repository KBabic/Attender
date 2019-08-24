import currencies from './currencies'
const APIKey = "a482ceb692166ce98a72"
const allCurrenciesUrl = `https://free.currconv.com/api/v7/currencies?apiKey=${APIKey}`

export async function convertCurrency(cur1, cur2) {
   const url = `https://free.currconv.com/api/v7/convert?apiKey=${APIKey}&q=${cur1}_${cur2}&compact=ultra`
   let response = await fetch(url)
   let responseJson = await response.json()
   return responseJson[`${cur1}_${cur2}`]
}