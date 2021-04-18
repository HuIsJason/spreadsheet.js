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
    rowCount: 4,
    persistent: true,
  }
);

const e1 = Spreadsheet('#accountssheetpreload');
e1.createSpreadsheet(
  {
    bank: 'text',
    'cash ($)': 'number',
    'credit debt ($)': 'number',
    'investment portfolio ($)': 'number',
    city: 'text',
    'dated opened': 'date',
  },
  {
    data: [
      ['TD', '10000', '1000000', '34535', 'Toronto', '2021-04-06'],
      ['RBC', '50000', '325345', '76868', 'Markham', '2020-06-22'],
      ['AmEx', '10000000', '5644', '76054', 'New York City', '2020-07-06'],
    ],
  }
);

const e2 = Spreadsheet('#income');
e2.createSpreadsheet(
  {
    month: 'month',
    'salary ($)': 'number',
    'bonuses ($)': 'number',
    'other income ($)': 'number',
    'expenses ($)': 'number',
    gifts: 'text',
  },
  {
    rowCount: 3,
    persistent: true,
  }
);
e2.addCellStyle('10000', 'green');

const e3 = Spreadsheet('#expenses').createSpreadsheet(
  {
    week: 'week',
    'rent ($)': 'number',
    'food ($)': 'number',
    'utilities ($)': 'number',
    'entertainment ($)': 'number',
    'transportation ($)': 'number',
  },
  {
    rowCount: 3,
    persistent: false,
    submitCallback: (tableArray) =>
      alert(`Your table is currently ${tableArray.length} rows long!`),
  }
);

[
  ['TD', '10000', '1000000', '34535', 'Toronto', '2021-04-06'],
  ['RBC', '50000', '325345', '76868', 'Markham', '2020-06-22'],
  ['AmEx', '10000000', '5644', '76054', 'New York City', '2020-07-06'],
];
