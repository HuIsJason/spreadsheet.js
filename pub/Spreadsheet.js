'use strict';

(function (global, document) {
  function Spreadsheet(selector) {
    const _self = {};

    const container = document.querySelector(selector);

    const styles = {
      border: '1px solid grey',
    };

    container.style.padding = '10px';

    const getTable = () => container.firstElementChild.firstElementChild;

    _self.createSpreadsheet = function (
      columns,
      options = { rowCount: 1, persistent: false, data: [], submitCallback }
    ) {
      const columnNames = Object.keys(columns);
      const tableContainer = document.createElement('div');
      container.appendChild(tableContainer);

      const spreadsheetTable = document.createElement('table');
      tableContainer.appendChild(spreadsheetTable);
      spreadsheetTable.style.border = styles.border;
      spreadsheetTable.style.fontFamily = 'Arial, sans-serif';
      spreadsheetTable.style.borderCollapse = 'collapse';
      spreadsheetTable.style.borderRadius = '100px';

      const headerRow = document.createElement('tr');
      spreadsheetTable.appendChild(headerRow);

      for (const columnName of columnNames) {
        const headerRowCell = document.createElement('th');
        headerRow.appendChild(headerRowCell);
        headerRowCell.append(columnName);
        headerRowCell.style.border = styles.border;
        headerRowCell.style.borderCollapse = 'collapse';
        headerRowCell.style.borderRadius = '100px';
      }

      const buttonContainer = document.createElement('div');
      container.appendChild(buttonContainer);
      buttonContainer.style.marginTop = '10px';

      const addRowButton = createButton(() => addRows(columns), 'Add row');
      const deleteBottomRowButton = createButton(
        () => deleteBottomRow(),
        'Delete bottom row'
      );
      const clearButton = createButton(
        () => clearSpreadsheet(options.persistent !== undefined),
        'Clear sheet'
      );

      buttonContainer.append(addRowButton, deleteBottomRowButton, clearButton);

      if (options.submitCallback) {
        const submitButton = createButton(
          () => options.submitCallback(this.arrayify()),
          'Submit'
        );
        buttonContainer.appendChild(submitButton);
      }

      if (options.persistent) {
        const saveSpreadsheetButton = createButton(
          () => saveSpreadsheet(),
          'Save'
        );
        buttonContainer.appendChild(saveSpreadsheetButton);
      }

      loadSpreadsheet(columns, options);
    };

    _self.addCellStyle = function (value, style) {
      const table = getTable();

      for (const cell of table.getElementsByTagName('td')) {
        const cellInput = cell.firstElementChild.firstElementChild;
        if (cellInput.value === value) {
          cell.style.borderRadius = '0px';
          cell.style.background = style;
          cellInput.style.background = style;
        }
      }
    };

    _self.addCellStyleSheet = function (stylingMap) {
      const table = getTable();

      for (const cell of table.getElementsByTagName('td')) {
        const cellInput = cell.firstElementChild.firstElementChild;
        const value = cellInput.value;
        if (value in stylingMap) {
          cell.style.borderRadius = '0px';
          cell.style.background = stylingMap[value];
          cellInput.style.background = stylingMap[value];
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
            const cellValue = cell.firstElementChild.firstElementChild.value;
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
      button.style.marginLeft = '5px';
      button.style.marginRight = '5px';

      return button;
    };

    const addRows = function (columnTypes, rowCount = 1) {
      const table = getTable();

      for (let i = 0; i < rowCount; i++) {
        const cellRow = document.createElement('tr');

        for (const columnType in columnTypes) {
          const cell = document.createElement('td');
          cellRow.appendChild(cell);
          cell.style.border = styles.border;
          cell.style.borderCollapse = 'collapse';
          cell.style.borderRadius = '100px';

          const cellDiv = document.createElement('div');
          cell.appendChild(cellDiv);
          cellDiv.style.resize = 'horizontal';
          cellDiv.style.overflow = 'auto';

          const cellInput = document.createElement('input');
          cellDiv.appendChild(cellInput);
          cellInput.setAttribute('type', columnTypes[columnType]);
          cellInput.style.width = '90%';
          cellInput.style.border = 'none';
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

    const loadSpreadsheet = function (
      columnTypes,
      { data = [], rowCount = 1, persistent = false }
    ) {
      const table = getTable();
      let tableArray;

      if (data.length > 0) {
        tableArray = data;
      }

      if (!persistent) {
        localStorage.removeItem(selector);
      } else if (localStorage.getItem(selector)) {
        tableArray = JSON.parse(localStorage.getItem(selector));
      }

      const rowDifference = tableArray ? tableArray.length : rowCount;

      addRows(columnTypes, rowDifference);

      if (tableArray) {
        [...table.children].forEach((row, i) => {
          if (i !== 0) {
            [...row.children].forEach((cell, j) => {
              cell.firstElementChild.firstElementChild.value =
                tableArray[i - 1][j];
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
            cell.firstElementChild.firstElementChild.value = '';
          });
        }
      });
      if (save) {
        saveSpreadsheet();
      }
    };

    return _self;
  }

  global.Spreadsheet = global.Spreadsheet || Spreadsheet;
})(window, window.document);
