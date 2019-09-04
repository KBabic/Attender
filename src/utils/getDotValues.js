export default getDotValues = event => {
   const { general, transport, accommodation, costs } = event
   function getDotValueParam(param) {
      switch(param) {
         case general:
            if (param.eventName && param.startDate && param.endDate && param.eventCity && param.eventCountry) {
               if (param.noFee) {
                  return true
               } else {
                  if (param.eventFee === 0) {
                     return true
                  }
                  if (param.eventFee !== 0 && param.eventCurrency === "") {
                     return false
                  }
                  if (param.eventFee !== 0 && param.eventFee && param.eventCurrency) {
                     return true
                  } else {
                     return false
                  }
               }
            } else {
               return false
            } 
         case transport:
               if (param.noTransport) {
                  return true
               } else {
                  if (param.transportCosts === 0) {
                     return true
                  }
                  if (param.transportCosts !== 0 && param.transpCurrency === "") {
                     return false
                  }
                  if (param.transportCosts !== 0 && param.transportCosts && param.transpCurrency) {
                     return true
                  } else {
                     return false
                  }
               }       
         case accommodation:
               if (param.noAccommodation) {
                  return true
               } else {
                  if (param.accommodationCosts === 0) {
                     return true
                  }
                  if (param.accommodationCosts !== 0 && param.accommodationCurrency === "") {
                     return false
                  }
                  if (param.accommodationCosts !== 0 && param.accommodationCosts && param.accommodationCurrency) {
                     return true
                  } else {
                     return false
                  }
               } 
         case costs:
            const keys = (Object.keys(param).filter(el => el !== "additionalCosts"))
            for (let k of keys) {
               if (param[k] === "") {
                  return false
               }
            }
            return true            
      }
   }
   const firstDot = getDotValueParam(general)
   const secondDot = getDotValueParam(transport)
   const thirdDot = getDotValueParam(accommodation)
   const fourthDot = getDotValueParam(costs)
   return [firstDot, secondDot, thirdDot, fourthDot]
}