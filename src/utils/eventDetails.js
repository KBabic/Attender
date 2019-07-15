export const eventDetails = [
   { 
      name: 'eventName',
      text: 'Event Name',
      placeholder: 'e.g. Conference',
      icon: "",
      action: 'addEventName',
      editable: true
   },
   {
      name: 'startDate',
      text: 'Start Date',
      placeholder: 'YYYY-MM-DD',
      icon: "date-range",
      action: 'addStartDate',
      editable: false
   },
   {
      name: 'endDate',
      text: 'End Date',
      placeholder: 'YYYY-MM-DD',
      icon: "date-range",
      action: 'addEndDate',
      editable: false
   },
   {
      name: 'eventCountry',
      text: 'Event Country',
      placeholder: 'e.g. Germany',
      icon: "",
      action: 'addEventCountry',
      editable: true
   },
   {
      name: 'eventCity',
      text: 'Event City',
      placeholder: 'e.g. Berlin',
      icon: "",
      action: 'addEventCity',
      editable: true
   },
   {
      name: 'eventCurrency',
      text: 'Registration Fee Currency',
      placeholder: 'Choose currency',
      icon: "keyboard-arrow-down",
      action: 'addEventCurrency',
      editable: false
   },
   {
      name: 'eventFee',
      text: 'Registration Fee Amount',
      placeholder: '100.00',
      icon: "",
      action: 'addEventFee',
      editable: true
   }
]