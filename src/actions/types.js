export const generalActions = {
   ADD_EVENT_NAME: 'add_event_name',
   ADD_START_DATE: 'add_start_date',
   ADD_END_DATE: 'add_end_date',
   ADD_EVENT_COUNTRY: 'add_event_country',
   ADD_EVENT_CITY: 'add_event_city',
   ADD_EVENT_CURRENCY: 'add_event_currency',
   ADD_EVENT_FEE: 'add_event_fee'
}
export const transportActions = {
   ADD_ORIGIN_CITY: 'add_origin_city',
   NO_NEED_TRANSPORT: 'no_need_transport',
   SEARCHING_TRANSPORT: 'searching_transport',
   SEARCH_TRANSPORT_SUCCESS: 'search_transport_success',
   SEARCH_TRANSPORT_FAIL: 'search_transport_fail',
   TRANSPORT_CHOSEN: 'transport_chosen',
   TRANSPORT_UNCHOSEN: 'transport_unchosen' 
}
export const accommodationActions = {
   NO_NEED_ACCOMMODATION: 'no_need_accommodation',
   INCREASE_NUM_OF_PERSONS: 'increase_num_of_persons',
   DECREASE_NUM_OF_PERSONS: 'decrease_num_of_persons',
   ADD_CHECKIN_DATE: 'add_checkin_date',
   ADD_CHECKOUT_DATE: 'add_checkout_date',
   SEARCHING_ACCOMMODATION: 'searching_accommodation',
   SEARCHING_MORE_RESULTS : 'searching_more_results',
   SEARCH_ACCOMMODATION_SUCCESS: 'search_accommodation_success',
   SEARCH_ACCOMMODATION_FAIL: 'search_accommodation_fail',
   FETCHING_ACCOMMODATION_DETAILS: 'fetching_accommodation_details',
   FETCH_ACCOMMODATION_DETAILS_SUCCESS: 'fetch_accommodation_details_success',
   FETCH_ACCOMMODATION_DETAILS_FAIL: 'fetch_accommodation_details_fail',
   ACCOMMODATION_CHOSEN: 'accommodation_chosen',
   ACCOMMODATION_UNCHOSEN: 'accommodation_unchosen',
}
export const costsActions = {
   CHOOSE_CURRENCY: 'choose_currency',
   TRANSPORT_COSTS_CALCULATED: 'transport_costs_calculated',
   ACCOMMODATION_COSTS_CALCULATED: 'accommodation_costs_calculated',
   EVENT_FEE_CALCULATED: 'event_fee_calculated',
   ADD_ADDITIONAL_COSTS: 'add_additional_costs'
}
// Notes actions:
export const ADD_NOTES = 'add_notes'
// Event actions:
export const NEW_EVENT_BUTTON_PRESSED = 'new_event_button_pressed'
export const EXISTING_EVENT_OPENED = 'existing_event_edited'
export const SAVE_EVENT = 'save_event'
export const DELETE_EVENT = 'delete_event'
export const UPDATE_EVENT = 'update_event'
// Overview actions:
export const CHOOSE_MONTH = 'choose_month'
export const CHOOSE_OVERVIEW_CURRENCY = 'choose_overview_currency'
export const TOTAL_MONTHLY_COSTS_CALCULATED = 'total_monthly_costs_calculated'
export const AVERAGE_MONTHLY_COSTS_CALCULATED = 'average_monthly_costs_calculated'