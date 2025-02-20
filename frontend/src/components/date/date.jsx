//настройка времени
export function padTwoDigits(num) {
  return num.toString().padStart(2, "0");
}

export function dateInYyyyMmDdHhMmSs(dateInput, dateDiveder = "-") {
  const date = new Date(dateInput);
  return (
    [
      padTwoDigits(date.getDate()),
      padTwoDigits(date.getMonth() + 1),
      date.getFullYear(),
    ].join(dateDiveder) +
    " " +
    [padTwoDigits(date.getHours()), padTwoDigits(date.getMinutes())].join(":")
  );
}
