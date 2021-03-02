function initialize() {
    // Creating a new spreadsheet
    // SpreadsheetApp.create('iHUB - Spreadsheet', 92, 9);
    // Logger.log('Creating new spreadsheet according to requirements is done');
  
    // Variables for convenience of work
    const spreadsheetID = '1fOL5LkruK7O2oXSAULMGdVI89lz0ak1hd8UrNyOJMXM';
    const Sheet = SpreadsheetApp.openById(spreadsheetID).getActiveSheet();
  
    // Set columns titles
    Sheet.getRange(1, 1, 1, 9).setValues([
      [
        'Datetime US',
        'Datetime UA',
        'Day US',
        'Day UA',
        'Day',
        'Month',
        'Year',
        'Time US',
        'Time UA'
      ]
    ]);
    Logger.log('Set titles according to requirements is done');
  
    const json = [
      {
        day: 3,
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        from: 2
      },
      {
        day: 4,
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        from: 15
      },
      {
        day: 5,
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        from: 28
      },
      {
        day: 6,
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        from: 41
      },
      {
        day: 7,
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        from: 54
      },
      {
        day: 8,
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        from: 67
      },
      {
        day: 9,
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        from: 80
      }
    ];
  
    // Filling the table with data
    json.forEach((element) => {
      element.hours.forEach((hour, index) => {
        const date = new Date(Date.UTC(2021, 2, element.day, hour, 0, 0));
        const ru = date.toLocaleString('ru-RU', { timeZone: 'UTC' });
        const usa = date.toLocaleString('ru-RU', {
          timeZone: 'UTC',
          hour12: true,
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
  
        const ivalidDetailedUSA = usa.replace('.', '/').replace('.', '/').slice(0, -3).replace(',', '').split('/');
        const detailedUSA = ivalidDetailedUSA[1] + '/' + ivalidDetailedUSA[0] + '/' + ivalidDetailedUSA[2];
        const validation = detailedUSA.split(' ');
        const detailedRU = ru.replace(',', '').replace('.', '/').replace('.', '/');
        const timeUSA = detailedUSA.slice(11);
        const timeRU = detailedRU.slice(11);
  
        const weekdayUSA = date.toLocaleString('en-US', { weekday: 'long' });
        const weekdayRU = date.toLocaleString('ru-RU', { weekday: 'long' });
        const day = date.toLocaleString('ru-RU', { day: 'numeric' });
        const month = date.toLocaleString('ru-RU', { month: 'numeric' });
        const year = date.toLocaleString('ru-RU', { year: 'numeric' });
  
        // This's need because, Google Sheets eating first number from the time
        if (index === 3) {
          const str = detailedUSA.slice(0, -7);
          Sheet.getRange(index + element.from, 1).setValues([[str + '12:00:00']]);
          Sheet.getRange(index + element.from, 8).setValues([['12:00:00']]);
        } else if (validation[1].length < 8) {
          const srt = '0' + validation[1];
          Sheet.getRange(index + element.from, 1).setValues([[validation[0] + ' ' + srt]]);
          Sheet.getRange(index + element.from, 8).setValues([[srt]]);
        } else {
          Sheet.getRange(index + element.from, 1).setValues([[detailedUSA]]);
          Sheet.getRange(index + element.from, 8).setValues([[timeUSA]]);
        }
  
        Sheet.getRange(index + element.from, 2).setValues([[detailedRU]]);
        Sheet.getRange(index + element.from, 3).setValues([[weekdayUSA]]);
        Sheet.getRange(index + element.from, 4).setValues([[weekdayRU[0].toUpperCase() + weekdayRU.slice(1)]
        ]);
        Sheet.getRange(index + element.from, 5).setValues([[day]]);
        Sheet.getRange(index + element.from, 6).setValues([[month]]);
        Sheet.getRange(index + element.from, 7).setValues([[year]]);
        Sheet.getRange(index + element.from, 9).setValues([[timeRU]]);
      });
    });
    Logger.log('Set data in the table is done');
  
    // Stylization of the sheet
    Sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    Sheet.getRange(1, 1, 92, 9).setHorizontalAlignment('center');
    Logger.log('Stylization of the sheet is done');
  
    // Set format for columns
    Sheet.getRange(1, 1, 92, 7).setNumberFormat('@STRING@');
    Logger.log('Set format for columns is done');
  }
  