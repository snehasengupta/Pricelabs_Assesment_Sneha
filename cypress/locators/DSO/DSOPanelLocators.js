const DSOPanelLocators = {
  panelModal: '#chakra-modal-dso-modal-v2',
  panelTitle: '[qa-id="dso-modal-title"]',
  closeButton: '[qa-id="dso-modal-close-button"]',

  startcell: '[qa-id="date-picker-calendar-start"]',
  startdateheader: '[qa-id="month-header-menu-button"]',

  monthdropdown: '[qa-id="date-range-picker-month-2026-06"]',
  calbody: '.react-datepicker__month-container',

  endcell: '[qa-id="date-picker-calendar-end"]',
  calendardaycell: '.react-datepicker__month-container:first .react-datepicker__day:not(.react-datepicker__day--outside-month):not(.react-datepicker__day--disabled)',

  pricepercent: '[qa-id="dso-price"]',

  dsoprice: '.chakra-radio__label',
  dsominmum: '[qa-id="dso-min-price-label"]',
  addprice: '[qa-id="add-value-btn"]',
  addminprice: '[qa-id="dso-min-price"]',
  addmaxprice: '[qa-id="dso-max-price"]',
  dsomaximum: '[qa-id="dso-max-price-label"]',
  dsobaseprice: '[qa-id="add-base-price-btn"]',
  addbaseprice: '[qa-id="dso-base-price"]',

  minstay: '[qa-id="dso-min-stay"]',
  autoexpire: '[qa-id="dso-auto-expire-checkbox"]',
  autoexpday: '[qa-id="override-expiry-input"]',
  reasoncheckbox: '[qa-id="dso-reason-checkbox"]',
  reasonnote: '[qa-id="custom-price-reason"]',
  dsoaddbutton: '[qa-id="add-dso-button"]',

  datePickerCalendar: '[qa-id="date-picker-default-range"]',
  datecell: '.css-1cpd080',
  bulkcell: '.react-datepicker__month-container',
  bulkcelldate: '.react-datepicker__day--001',

  datePickerMonDay: `'[qa-id="dso-dow-Mo-button"]'`,
  datePickerTueDay: `'[qa-id="dso-dow-Tu-button"]'`,
  datePickerWedDay: `'[qa-id="dso-dow-We-button"]'`,
  datePickerThuDay: `'[qa-id="dso-dow-Th-button"]'`,
  datePickerFriDay: `'[qa-id="dso-dow-Fr-button"]'`,
  datePickerSatDay: `'[qa-id="dso-dow-Sa-button"]'`,
  datePickerSunDay: `'[qa-id="dso-dow-Su-button"]'`,
  datePickerAllday: '[qa-id="dso-dow-all-button"]',
  applySpecificDaysCheckbox: '[qa-id="apply-on-specific-days-checkbox"]',
  datePickerStartDate: '[qa-id="date-picker-calendar-start"]',
  datePickerEndDate: '[qa-id="date-picker-calendar-end"]',

  cancelButton: '[qa-id="dso-modal-cancel-btn"]',
  updatebutton: '[qa-id="dso-override-confirmation-update-button"]',

  priceSummary: 'p.chakra-text',
  finalPriceDisplay: '[qa-id="price-tooltip--VRMREALTY___246-4"]',

  invalidpercentmessage: '[qa-id="dso-price-error"]',
  bulkdatemonth: '.react-datepicker__month-container',
  blkdatstart: '.react-datepicker__day--026',
  outsideMonth: '.react-datepicker__day--outside-month'

};

export default DSOPanelLocators;
