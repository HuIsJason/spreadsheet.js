'use strict';

const e = Spreadsheet('#accountssheet');
e.createSpreadsheet(
  {
    bank: 'text',
    'cash ($)': 'number',
    'credit debt ($)': 'number',
    'investment portfolio ($)': 'number',
    city: 'text',
    'dated opened': 'date',
  },
  {
    rowCount: 2,
    persistent: true,
  }
);
e.addCellStyleSheet({ TD: '#64f547', RBC: '#5e87ff' });
e.addCellStyle('Toronto', '#18f5d4');
console.log(e.arrayify());

const e2 = Spreadsheet('#income');
e2.createSpreadsheet(
  {
    month: 'month',
    'salary ($)': 'number',
    'bonuses ($)': 'number',
    'other income ($)': 'number',
  },
  {
    rowCount: 3,
    persistent: true,
  }
);

const e3 = Spreadsheet('#expenses');
e3.createSpreadsheet(
  {
    month: 'month',
    'rent ($)': 'number',
    'food ($)': 'number',
    'utilities ($)': 'number',
  },
  {
    rowCount: 3,
    persistent: true,
  }
);
