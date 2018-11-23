import {date} from 'quasar'

export default {
  methods: {
    parseDate: function (dateString, format) {
      if (format === 'DD.M.YYYY') {
        let dateArray = dateString.split('.')
        let isDayOfMonth = (dateArray[0] >= 1 && dateArray[0] <= 31)
        let isMonthOfYear = (dateArray[1] >= 1 && dateArray[1] <= 12)
        let isValidYear = (dateArray[2] >= 1900 && dateArray[2] <= 2099)
        if (isDayOfMonth && isMonthOfYear && isValidYear) {
          return new Date(dateArray[2], dateArray[1], dateArray[0])
        } else if (!isDayOfMonth) {
          throw new Error('Cannot parse dateString=' + dateString + ' - day is not between 1-31' + dateArray[0])
        } else if (!isMonthOfYear) {
          throw new Error('Cannot parse dateString=' + dateString + ' - month is not between 1-12' + dateArray[1])
        } else if (!isValidYear) {
          throw new Error('Cannot parse dateString=' + dateString + ' - year is not between 1900-2099' + dateArray[2])
        } else {
          throw new Error('Cannot parse dateString=' + dateString + ' - unknown parse error')
        }
      }
      throw new Error('Cannot parse dateString=' + dateString + ' - unknown format=' + format)
    },
    parseProzent: function (prozentString) {
      let number = Number(prozentString)
      if (number >= 0 && number <= 100) {
        return number
      }
      throw new Error('Cannot parse prozentString=' + prozentString + ' - wert ist nicht zwischen [0-100]')
    }
  },
  filters: {
    YYYY (timestamp) {
      return date.formatDate(timestamp, 'YYYY')
    },
    ddMMYYY (timestamp) {
      return date.formatDate(timestamp, 'DD.M.YYYY')
    },
    formatNumber (number) {
      let val = (number / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
