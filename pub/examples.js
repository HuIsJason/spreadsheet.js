'use strict';

const e = Spreadsheet('#container');
e.createSpreadsheet(
  {
    name: 'text',
    age: 'number',
    'date of birth': 'date',
    city: 'text',
    time: 'time',
  },
  {
    rowCount: 3,
    persistent: true,
  }
);
e.addCellStyleSheet({ Jason: 'red', '-1': 'green' });
e.addCellStyle('Markham', '#D2573C');

const e2 = Spreadsheet('#container2');
e2.createSpreadsheet(
  {
    character: 'string',
    affinity: 'number',
    village: 'email',
    jutsu: 'tel',
  },
  {
    rowCount: 5,
    data: [
      ['Jason Hu', '', '', 'Markham'],
      ['Markham', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['weqw', '-1', 'wqeq', 'wqeq'],
    ],
  }
);
e2.addCellStyle('Markham', '#D2573C');
