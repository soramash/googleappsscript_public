function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Mosaicking (Random)', 'replaceWithSymbolsFromRandom')
    .addItem('Mosaicking (Middle)', 'replaceWithSymbolsFromMiddle')
    .addItem('Mosaicking (Full Random)', 'replaceWithSymbols')
    .addToUi();
}

const symbols = ['█', '▒', '░', '▓', '▆', '▅', '⬜', '🔲', '🔳'];

function replaceWithSymbols() {
  processCells((cell) => randomizeString(cell));
}

function replaceWithSymbolsFromMiddle() {
  processCells((cell) => {
    const head = cell.slice(0, 2);
    const tail = cell.slice(2);
    return head + randomizeString(tail);
  });
}

function replaceWithSymbolsFromRandom() {
  processCells((cell) => replaceInGroupsOfFour(cell));
}

function processCells(transformFunction) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  const values = range.getValues();

  const replacedValues = values.map(row => 
    row.map(cell => typeof cell === 'string' && cell !== '' ? transformFunction(cell) : cell)
  );

  range.setValues(replacedValues);
}

function randomizeString(text) {
  return Array.from(text).map(() => randomSymbol()).join('');
}

function replaceInGroupsOfFour(text) {
  let result = '';
  for (let i = 0; i < text.length; i += 4) {
    const slice = text.slice(i, i + 4);
    const replaced = slice[0] + randomizeString(slice.slice(1));
    result += replaced;
  }
  return result;
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}
