export const getAllYears = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  let years = [];
  for (let i = 1900; i <= currentYear; i++) {
    years.push(i);
  }

  return years;
};

export const getDaysInMonth = (month, year = new Date().getFullYear()) => {
  return new Date(year, month, 0).getDate(); // month is 1-based
};
