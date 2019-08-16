export default getDotValues = (params, optionalParam=false) => {
   // first dot shows that all general info is filled
   // 'params' is an array of parameters that affect the true/false value of a dot
   // optionalParam is for transport and accommodation and takes into account if the option 'no need transport/accommodation' is checked
   if (!params.includes("") && !params.includes(0)) {
      return true
   } else if (optionalParam) {
      return false
   } else {
      return false
   }
}