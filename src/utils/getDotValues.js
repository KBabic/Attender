/*export default getDotValues = (params, optionalParam) => {
   // first dot shows that all general info is filled
   // 'params' is an array of parameters that affect the true/false value of a dot
   // optionalParam is for transport and accommodation and takes into account if the option 'no need transport/accommodation' is checked
   if (optionalParam === undefined) {
      if (!params.includes("") && !params.includes(0)) {
         return true
      } else {
         return false
      }
   } else {
      if (optionalParam) {
         return true
      } else if (!params.includes("") && !params.includes(0)) {
            return true
         } else {
            return false
         }
      }
   }
   /*if (!params.includes("") && !optionalParam) {
      return false
   } else if (!params.includes("") && optionalParam) {
      return true
   } else if (!params.includes(0) && !optionalParam) {
      return false
   } else if (!params.includes(0) && optionalParam) {
      return true
   } else {
      return false
   }
}*/
export default getDotValues = event => {
   const { general, transport, accommodation, costs } = event
   function getDotValue(arr) {
      if (arr.includes("") || arr.includes(0) || arr.includes(false)) {
         return false
      } else {
         return true
      }
   }
   function getDotValueParam(param) {
      if (param === transport) {
         if (param.transportCosts === 0 && param.noTransport) {
            return true
         } else if (param.transportCosts === 0 && !param.noTransport) {
            return false
         } else if (param.transportCosts !== 0) {
            return true
         }
      } else if (param === accommodation) {
         if (param.accommodationCosts === 0 && param.noAccommodation) {
            return true
         } else if (param.accommodationCosts === 0 && !param.noAccommodation) {
            return false
         } else if (param.accommodationCosts !== 0) {
            return true
         }
      }
   }
   const firstDot = getDotValue(Object.values(general))
   const secondDot = getDotValueParam(transport, transport.transportCosts, transport.noTransport)
   const thirdDot = getDotValueParam(accommodation, accommodation.accommodationCosts, accommodation.noAccommodation)
   const fourthDot = getDotValue(Object.values(costs))
   return [firstDot, secondDot, thirdDot, fourthDot]
}