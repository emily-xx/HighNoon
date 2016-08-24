(function whereIsHighNoon() {
  var originalTime = {
    hours: 4,
    minutes: 4
  };
  var element = document.getElementById('timezoneTable');
  var newNoonEntry = {
    cityName: '',
    utcOffset: ''
  };
  var currentNoonEntry = angular.copy(newNoonEntry);
  var timeZoneCityTableJson = [];
  element.querySelectorAll('tr > td').forEach(function(htmlElement, i) {
    if (!htmlElement.innerHTML || htmlElement.innerHTML == '') {
      return; // continue
    }

    if (i % 2 === 0) { // Country name
      var aTag = htmlElement.querySelector('a');
      currentNoonEntry = angular.copy(newNoonEntry);
      currentNoonEntry.cityName = aTag.text;
    } else { // Time
      var utcOffset = 0.0;
      var timeRegex = /(.*) (\d+):(\d+) (.*)$/g;
      var timeMatches = timeRegex.exec(htmlElement.innerHTML);
      var day = timeMatches[1];
      var hours = parseInt(timeMatches[2]);
      var minutes = parseInt(timeMatches[3]);
      var amPm = timeMatches[4];

      if (amPm == 'PM' && hours < 12) {
        hours += 12;
      } else if (amPm == 'AM' && hours == 12) {
        hours = 0;
      }

      if (day == 'Wed') {
        //hours += 24; Add this if UTC day trails furthest timezone (UTC +14)
      } else if (day == 'Tue') {
        hours-=24; // Add this if UTC day is on most recent day
      }
      utcOffset = (hours - originalTime.hours);
      if (minutes > originalTime.minutes) {
        utcOffset += ((minutes - originalTime.minutes) / 60);
      }

      currentNoonEntry.utcOffset = utcOffset;
      timeZoneCityTableJson.push(angular.copy(currentNoonEntry));
    }
  });

  document.getElementById('jsonDiv').innerHTML = JSON.stringify(timeZoneCityTableJson);
}());
