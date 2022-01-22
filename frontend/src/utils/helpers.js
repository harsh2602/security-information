export const updateDate = (date) => {
  if (date === null || date === undefined) return;

  const updatedDate = new Date(date);
  updatedDate.setHours(11, 59, 59);
  return updatedDate;
};
