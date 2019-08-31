import moment from 'moment'
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const today = new Date()
const currentYear = today.getFullYear()
const previousYear = currentYear - 1
const nextYear = currentYear + 1

const currentYearMonths = months.map(month => month + " " + currentYear)
const previousYearMonths = months.map(month => month + " " + previousYear)
const nextYearMonths = months.map(month => month + " " + nextYear)

export const monthsList = [...previousYearMonths, ...currentYearMonths, ...nextYearMonths]

export function getInitialDate(param, startDate, checkIn = null) {
   let initialDate
   let minDate
   switch(param) {
      case "startDate":
      case "checkIn":
         // minDate should be today
         const today = new Date()
         const dd = String(today.getDate()).padStart(2,'0')
         const mm = String(today.getMonth() + 1).padStart(2,'0')
         const yyyy = today.getFullYear()
         minDate = moment(yyyy + "-" + mm + "-" + dd + "T00:00:00")
         initialDate = minDate
         break
      case "endDate":
      case "checkOut":
         //minDate should be startDate or checkIn
         if (checkIn === null) {
            minDate = moment(startDate.slice(0,4) + "-" + startDate.slice(5,7) + "-" + startDate.slice(8) + "T00:00:00")
            initialDate = minDate
            break
         } else {
            minDate = moment(checkIn.slice(0,4) + "-" + checkIn.slice(5,7) + "-" + checkIn.slice(8) + "T00:00:00")
            initialDate = minDate
            break
         }    
   }
   return initialDate
}