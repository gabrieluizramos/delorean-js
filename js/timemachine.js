var timeMachine = (function timeMachine(today, locale){
  
  'use strict';

  var _date = today;
  var _locale = locale;

  function _setDate(date){
    date = date.split('-');
    date = date[1] + '/' + date[2] + '/' + date[0];
    _date = new Date(date);
    
    return true;
  }

  function _setLocale(locale){
    _locale = locale;
  }

  function _getLocale(){
    return _locale;
  }

  function _getPrimitiveDate(){
    return _date;
  }

  function _get(whatYouWant, type){
    return _date.toLocaleString(_locale , {[whatYouWant]: type});
  }

  function _getFullDate(){
    return _get('day','2-digit') + '/' + _get('month','2-digit') + '/' + _get('year','numeric');
  }

  function _getYear(type){
    return _get('year', (type || 'numeric'));
  }

  function _getMonth(type){
    return _get('month', (type || 'long'));
  }

  function _getDay(type){
    return _get('day', (type || 'numeric'));
  }

  function _getWeekDay(type){
    return _get('weekday', (type || 'long'));
  }

  function _getAllMonthsOfYear(type){
    var monthsNames = [];
    var realDate = ( _date.getMonth() + 1 ) + '/' + _date.getDate() + '/' + _date.getFullYear();

    for ( var months = 1 ; months < 12 ; months++ ) {
      _setDate(months +'/01/2017');
      monthsNames.push(_getMonth(type));
    }
    
    _setDate(realDate);
    
    return monthsNames;
  }

  return {
    getPrimitiveDate: _getPrimitiveDate,
    getDay: _getDay,
    getWeekDay: _getWeekDay,
    getMonth: _getMonth,
    getAllMonthsOfYear: _getAllMonthsOfYear,
    getYear: _getYear,
    getFullDate: _getFullDate,
    setDate: _setDate,
    getLocale: _getLocale,
    setLocale: _setLocale
  };

})(new Date(), 'pt-br');