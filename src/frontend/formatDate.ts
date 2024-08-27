function formatTimestampAsDate(timestamp: number) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1; // January is 0
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export default formatTimestampAsDate;
