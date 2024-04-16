function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Mosaicking', 'replaceWithSymbols')
    .addToUi();
}

function replaceWithSymbols() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  const values = range.getValues();

  const symbols = ['█', '▒', '░', '▓', '▆', '▅', '⬜', '🔲', '🔳'];
  const replacedValues = values.map(row => 
    row.map(cell => {
      if (typeof cell === 'string' && cell !== '') {
        return Array.from(cell).map(() => 
          symbols[Math.floor(Math.random() * symbols.length)]
        ).join('');
      }
      return cell;
    })
  );

  range.setValues(replacedValues);
}
