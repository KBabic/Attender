import currencies from './currencies'
const APIKey = ""
const allCurrenciesUrl = `https://free.currconv.com/api/v7/currencies?apiKey=${APIKey}`
const currency1 = "EUR"
const currency2 = "USD"
const conversionUrl = `https://free.currconv.com/api/v7/convert?apiKey=${APIKey}&q=${currency1}_${currency2}&compact=ultra`

export const getAllCurrencies = async () => {
   // something here
}