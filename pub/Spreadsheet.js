'use strict';

function Spreadsheet(selector) {
  const _self = {};

  const container = document.querySelector(selector);

  const styles = {
    border: '1px solid grey',
    tableFont: 'Arial, sans-serif',
    collapse: 'collapse',
    borderRadius: '100px',
    buttonDivPadding: '10px',
    mainDivPadding: '20px',
    buttonMargin: '5px',
  };

  container.style.padding = styles.mainDivPadding;

  const getTable = () => container.firstElementChild.firstElementChild;

  _self.createSpreadsheet = function (
    columns,
    options = { rowCount: 1, persistent: false, data: [] }
  ) {
    const columnNames = Object.keys(columns);
    const tableContainer = document.createElement('div');

    const spreadsheetTable = document.createElement('table');
    spreadsheetTable.style.border = styles.border;
    spreadsheetTable.style.fontFamily = styles.tableFont;
    spreadsheetTable.style.borderCollapse = styles.collapse;
    spreadsheetTable.style.borderRadius = styles.borderRadius;

    tableContainer.appendChild(spreadsheetTable);
    container.appendChild(tableContainer);

    const headerRow = document.createElement('tr');

    for (const columnName of columnNames) {
      const headerRowCell = document.createElement('th');
      headerRowCell.style.border = styles.border;
      headerRowCell.style.borderCollapse = styles.collapse;
      headerRowCell.style.borderRadius = styles.borderRadius;
      headerRowCell.append(columnName);
      headerRow.appendChild(headerRowCell);
    }

    spreadsheetTable.appendChild(headerRow);

    // button div
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = styles.buttonDivPadding;

    // add row button
    const addRowButton = createButton(() => addRows(columns), 'Add row');
    buttonContainer.appendChild(addRowButton);
    // delete bottom row button
    const deleteBottomRowButton = createButton(
      () => deleteBottomRow(),
      'Delete bottom row'
    );
    buttonContainer.appendChild(deleteBottomRowButton);
    // clear button
    const clearButton = createButton(
      () => clearSpreadsheet(options.persistent !== undefined),
      'Clear sheet'
    );
    buttonContainer.appendChild(clearButton);

    loadSpreadsheet(columns, options);

    if (options.persistent) {
      // save button
      const saveSpreadsheetButton = createButton(
        () => saveSpreadsheet(),
        'Save'
      );
      buttonContainer.appendChild(saveSpreadsheetButton);
    }

    container.appendChild(buttonContainer);
  };

  _self.addCellStyle = function (value, style) {
    const table = getTable();
    for (const cell of table.getElementsByTagName('td')) {
      if (cell.firstElementChild.value === value) {
        cell.style.borderRadius = '0px';
        cell.style.background = style;
        cell.firstElementChild.style.background = style;
      }
    }
  };

  _self.addCellStyleSheet = function (stylingMap) {
    const table = getTable();
    for (const cell of table.getElementsByTagName('td')) {
      const value = cell.firstElementChild.value;
      if (value in stylingMap) {
        cell.style.borderRadius = '0px';
        cell.style.background = stylingMap[value];
        cell.firstElementChild.style.background = stylingMap[value];
      }
    }
  };

  _self.arrayify = function () {
    const table = getTable();
    const tableArray = [];
    [...table.children].forEach((row, i) => {
      if (i !== 0) {
        const rowArray = [];
        [...row.children].forEach((cell) => {
          const cellValue = cell.firstElementChild.value;
          rowArray.push(cellValue);
        });
        tableArray.push(rowArray);
      }
    });
    return tableArray;
  };

  const createButton = function (onclick, innerText) {
    const button = document.createElement('button');
    button.onclick = onclick;
    button.innerText = innerText;
    button.style.marginLeft = styles.buttonMargin;
    button.style.marginRight = styles.buttonMargin;

    return button;
  };

  const addRows = function (columnTypes, rowCount = 1) {
    const table = getTable();
    for (let i = 0; i < rowCount; i++) {
      const cellRow = document.createElement('tr');

      for (const columnType in columnTypes) {
        const cell = document.createElement('td');
        cell.style.border = styles.border;
        cell.style.borderCollapse = styles.collapse;
        cell.style.borderRadius = styles.borderRadius;

        const cellInput = document.createElement('input');
        // cellInput.style.fontFamily = 'Arial, sans-serif';
        cellInput.setAttribute('type', columnTypes[columnType]);
        cellInput.style.border = 'none';

        cell.appendChild(cellInput);
        cellRow.appendChild(cell);
      }
      table.appendChild(cellRow);
    }
  };

  const deleteBottomRow = function () {
    const table = getTable();
    if (table.children.length > 2) {
      table.removeChild(table.lastElementChild);
    } else {
      alert('Cannot delete any more rows!');
    }
  };

  const saveSpreadsheet = function () {
    const tableArray = _self.arrayify();
    localStorage.setItem(selector, JSON.stringify(tableArray));
  };

  const loadSpreadsheet = function (columnTypes, options) {
    const table = getTable();
    const { data = [], rowCount = 1 } = options;
    let tableArray;

    if (data.length > 0) {
      tableArray = data;
    }

    if (localStorage.getItem(selector)) {
      tableArray = JSON.parse(localStorage.getItem(selector));
    }

    const rowDifference = tableArray ? tableArray.length : rowCount;
    addRows(columnTypes, rowDifference);
    if (data.length > 0 || localStorage.getItem(selector)) {
      [...table.children].forEach((row, i) => {
        if (i !== 0) {
          [...row.children].forEach((cell, j) => {
            cell.firstElementChild.value = tableArray[i - 1][j];
          });
        }
      });
    }
  };

  const clearSpreadsheet = function (save) {
    const table = getTable();
    [...table.children].forEach((row, i) => {
      if (i !== 0) {
        [...row.children].forEach((cell) => {
          cell.firstElementChild.value = '';
        });
      }
    });
    if (save) {
      console.log('save');
      saveSpreadsheet();
    }
  };

  return _self;
}
