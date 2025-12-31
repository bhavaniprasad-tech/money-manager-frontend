export const addThousandsSeparator = (num) => {
    if (num === null || num === undefined || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");

    // If number is less than 1000, return as is
    if (integerPart.length <= 3) {
        return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
    }

    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);

    const formattedOtherNumbers =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

    const formattedNumber = `${formattedOtherNumbers},${lastThree}`;

    return fractionalPart
        ? `${formattedNumber}.${fractionalPart}`
        : formattedNumber;
};

// Groups income transactions by date and prepares line chart data
export const prepareIncomeLineChartData = (transactions = []) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return [];
  }

  const incomeMap = {};

  transactions.forEach((txn) => {
    // Transactions passed to this util are incomes already (from incomes endpoint).
    // Be defensive: skip if no date or invalid date, and ensure amount is numeric.
    if (!txn || !txn.date) return;

    const dateObj = new Date(txn.date);
    if (isNaN(dateObj)) return;

    const date = dateObj.toISOString().split("T")[0];

    if (!incomeMap[date]) {
      incomeMap[date] = 0;
    }

    incomeMap[date] += Number(txn.amount) || 0;
  });

  // Convert to sorted array (important for line charts)
  return Object.keys(incomeMap)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => ({
      date,
      income: incomeMap[date],
    }));
};

// Groups expense transactions by date and prepares line chart data
export const prepareExpenseLineChartData = (transactions = []) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return [];
  }

  const expenseMap = {};

  transactions.forEach((txn) => {
    if (!txn || !txn.date) return;

    const dateObj = new Date(txn.date);
    if (isNaN(dateObj)) return;

    const date = dateObj.toISOString().split("T")[0];

    if (!expenseMap[date]) {
      expenseMap[date] = 0;
    }

    expenseMap[date] += Number(txn.amount) || 0;
  });

  // Return objects with `income` key to match `CustomLineChart`'s dataKey
  return Object.keys(expenseMap)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => ({
      date,
      income: expenseMap[date],
    }));
};

