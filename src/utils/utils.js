export function getMonthAgoDate () {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  return new Date(now
    .setFullYear(
      currentMonth === 0 ? currentYear - 1 : currentYear,
      currentMonth === 0 ? 11 : currentMonth - 1,
      now.getDate()
    ));
}

export function formatDate (date = new Date()) {
  const month = '' + (date.getMonth() + 1);
  const day = '' + date.getDate();
  const year = date.getFullYear();
  return [
    year,
    month.length < 2 ? `0${month}` : month,
    day.length < 2 ? `0${day}` : day
  ].join('-');
}

export function genericValueGetter(row, column, fallbackValue = '-') {
  return column.cellRenderer ?
    column.cellRenderer(row, column) : row[column.id] ?
      row[column.id] : fallbackValue;
}