var timemachine = (function timeMachine(today, locale) {

  var _date = today;
  var _locale = locale;

  // Bug fixes for IE
  var _navigatorIsIE = window.navigator.userAgent.indexOf('MSIE') > 0;
  var _IEMonths = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  var _IEWeekDays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

  function _get(whatYouWant, type) {
    var dateObj = { timeZone: 'UTC' };
    dateObj[whatYouWant] = type;
    // verify if user is in IE
    return _navigatorIsIE ? _getForIE(whatYouWant, type) : _date.toLocaleDateString(_locale, dateObj);
  }

  function _getForIE(whatYouWant, type) {
    var toLocaleString;

    switch (whatYouWant) {
      // weekday
      case 'weekday':
        toLocaleString = _date.getDay();

        switch (type) {
          case 'short':
            toLocaleString = _IEWeekDays[toLocaleString].substring(0, 3);
            break;

          case 'long':
            toLocaleString = _IEWeekDays[toLocaleString];
            break;
        }
        break;
      // end weekday

      // day
      case 'day':
        toLocaleString = _date.getDate();

        switch (type) {
          case '2-digit':
            toLocaleString = toLocaleString < 10 ? '0' + toLocaleString : toLocaleString;
            break;
        }
        break;
      // end day

      // month
      case 'month':
        toLocaleString = _date.getMonth();

        switch (type) {
          case 'short':
            toLocaleString = _IEMonths[toLocaleString].substring(0, 3);
            break;

          case 'long':
            toLocaleString = _IEMonths[toLocaleString];
            break;

          case 'numeric':
            toLocaleString++;
            break;

          case '2-digit':
            toLocaleString++;
            toLocaleString = toLocaleString < 10 ? '0' + toLocaleString : toLocaleString;
            break;
        }
        break;
      // end month

      // year
      case 'year':
        toLocaleString = _date.getFullYear();

        switch (type) {
          case '2-digit':
            toLocaleString = Number(String(toLocaleString).substring(2, 4));
            break;
        }
        break;
      // end year
    }

    return toLocaleString;
  }

  function _setDate(date) {
    date += 'T00:00:00';
    _date = new Date(date);

    return true;
  }

  function _setLocale(locale) {
    _locale = locale;
  }

  function _reboot() {
    _date = new Date();
  }

  function _getTime() {
    return _date.getHours() + 'h' + _date.getMinutes() + 'min' + _date.getSeconds() + 'seg';
  }

  function _getISODate() {
    return _get('year', 'numeric') + '-' + _get('month', '2-digit') + '-' + _get('day', '2-digit');
  }

  function _getLocale() {
    return _locale;
  }

  function _getPrimitiveDate() {
    return _date;
  }

  function _getFullDate() {
    return _get('day', '2-digit') + '/' + _get('month', '2-digit') + '/' + _get('year', 'numeric');
  }

  function _getYear(type) {
    return _get('year', (type || 'numeric'));
  }

  function _getMonth(type) {
    return _get('month', (type || 'long'));
  }

  function _getDay(type) {
    return _get('day', (type || 'numeric'));
  }

  function _getWeekDay(type) {
    return _get('weekday', (type || 'long'));
  }

  function _getAllMonthsOfYear(type) {
    var monthsNames = [];
    var realYear = _date.getFullYear();
    var realMonth = (_date.getMonth() + 1);
    realMonth = realMonth < 10 ? '0' + realMonth : realMonth;
    var realDay = _date.getDate();
    realDay = realDay < 10 ? '0' + realDay : realDay;

    var realDate = realYear + '-' + realMonth + '-' + realDay;

    for (var months = 1; months <= 12; months++) {
      months = months < 10 ? '0' + months : months;
      _setDate('2017-' + months + '-01');
      monthsNames.push(_getMonth(type));
    }

    _setDate(realDate);

    return monthsNames;
  }

  return !_navigatorIsIE ?
    {
      getTime: _getTime,
      getPrimitiveDate: _getPrimitiveDate,
      getDay: _getDay,
      getWeekDay: _getWeekDay,
      getMonth: _getMonth,
      getAllMonthsOfYear: _getAllMonthsOfYear,
      getYear: _getYear,
      getFullDate: _getFullDate,
      getISODate: _getISODate,
      setDate: _setDate,
      getLocale: _getLocale,
      setLocale: _setLocale,
      reboot: _reboot,
      getISODate: _getISODate
    } :
    {
      getDay: _getDay,
      getWeekDay: _getWeekDay,
      getMonth: _getMonth,
      setDate: _setDate,
      getYear: _getYear,
      getFullDate: _getFullDate,
      getISODate: _getISODate
    };

})(new Date(), 'pt-br');