const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const today = new Date()
const currentYear = today.getFullYear()
const previousYear = currentYear - 1
const nextYear = currentYear + 1

const currentYearMonths = months.map(month => month + " " + currentYear)
const previousYearMonths = months.map(month => month + " " + previousYear)
const nextYearMonths = months.map(month => month + " " + nextYear)

export default monthsList = [...previousYearMonths, ...currentYearMonths, ...nextYearMonths]