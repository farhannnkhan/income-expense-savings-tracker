const STORAGE_KEY = "csd0111_money_tracker_v1";

const DEFAULT_TRANSACTIONS = [
  {
    id: 101,
    date: "2026-10-01",
    description: "Monthly Family Allowance",
    category: "Allowance",
    type: "Income",
    amount: 20500
  },
  {
    id: 102,
    date: "2026-10-04",
    description: "Hostel Mess & Tiffin",
    category: "Food & Mess",
    type: "Expense",
    amount: 3200
  },
  {
    id: 103,
    date: "2026-10-09",
    description: "Engineering Lab Manual & Printouts",
    category: "Books & Study",
    type: "Expense",
    amount: 850
  },
  {
    id: 104,
    date: "2026-10-14",
    description: "Mobile & Wi-Fi Recharge",
    category: "Bills & Recharge",
    type: "Expense",
    amount: 599
  },
  {
    id: 105,
    date: "2026-10-19",
    description: "Auto & Local Bus Commute",
    category: "Transport",
    type: "Expense",
    amount: 650
  },
  {
    id: 106,
    date: "2026-10-23",
    description: "Groceries & Evening Snacks",
    category: "Food & Mess",
    type: "Expense",
    amount: 900
  },
  {
    id: 107,
    date: "2026-10-27",
    description: "Part-time work",
    category: "Other",
    type: "Income",
    amount: 1800
  }
];

let transactions = loadTransactions();

const form = document.getElementById("transaction-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const categorySelect = document.getElementById("category");
const dateInput = document.getElementById("date");

const descError = document.getElementById("desc-error");
const amountError = document.getElementById("amount-error");
const dateError = document.getElementById("date-error");

const searchInput = document.getElementById("search-input");
const filterTypeSelect = document.getElementById("filter-type");
const resetSampleBtn = document.getElementById("reset-sample-btn");
const tbody = document.getElementById("transaction-tbody");
const emptyState = document.getElementById("empty-state");

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error("Failed to read LocalStorage:", err);
  }
  return [...DEFAULT_TRANSACTIONS];
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function formatINR(value) {
  return "₹" + Number(value).toLocaleString("en-IN");
}

function updateSummaryCards() {
  let totalIncome = 0;
  let totalExpense = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  transactions.forEach((item) => {
    if (item.type === "Income") {
      totalIncome += item.amount;
      incomeCount++;
    } else {
      totalExpense += item.amount;
      expenseCount++;
    }
  });

  const savings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : "0.0";

  document.getElementById("total-income").textContent = formatINR(totalIncome);
  document.getElementById("income-count").textContent = `${incomeCount} ${incomeCount === 1 ? "entry" : "entries"} recorded`;

  document.getElementById("total-expense").textContent = formatINR(totalExpense);
  document.getElementById("expense-count").textContent = `${expenseCount} ${expenseCount === 1 ? "entry" : "entries"} recorded`;

  const savingsEl = document.getElementById("total-savings");
  savingsEl.textContent = (savings < 0 ? "-" : "") + formatINR(Math.abs(savings));
  savingsEl.style.color = savings < 0 ? "#dc4c3e" : "#2563eb";
  document.getElementById("savings-rate").textContent = `Savings rate: ${savingsRate}%`;
}

function renderTable() {
  const query = searchInput.value.trim().toLowerCase();
  const typeFilter = filterTypeSelect.value;

  const filtered = transactions.filter((item) => {
    const matchesType = typeFilter === "All" || item.type === typeFilter;
    const matchesText =
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesType && matchesText;
  });

  tbody.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  filtered
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((item) => {
      const tr = document.createElement("tr");
      const badgeClass = item.type === "Income" ? "badge-income" : "badge-expense";
      const amountClass = item.type === "Income" ? "income-text" : "expense-text";
      const sign = item.type === "Income" ? "+" : "-";

      tr.innerHTML = `
        <td>${item.date}</td>
        <td>${escapeHTML(item.description)}</td>
        <td>${escapeHTML(item.category)}</td>
        <td><span class="badge ${badgeClass}">${item.type}</span></td>
        <td class="num-col ${amountClass}">${sign}${formatINR(item.amount)}</td>
        <td class="action-col">
          <button type="button" class="btn-delete" data-id="${item.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validateForm() {
  let valid = true;
  descError.textContent = "";
  amountError.textContent = "";
  dateError.textContent = "";

  const desc = descInput.value.trim();
  const amount = Number(amountInput.value);
  const dateVal = dateInput.value;

  if (desc.length < 2) {
    descError.textContent = "Enter at least 2 characters for description.";
    valid = false;
  }

  if (!amount || amount <= 0 || Number.isNaN(amount)) {
    amountError.textContent = "Enter a valid positive amount in ₹.";
    valid = false;
  }

  if (!dateVal) {
    dateError.textContent = "Please choose a valid date.";
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const newEntry = {
    id: Date.now(),
    date: dateInput.value,
    description: descInput.value.trim(),
    category: categorySelect.value,
    type: typeSelect.value,
    amount: Math.round(Number(amountInput.value))
  };

  transactions.push(newEntry);
  saveTransactions();
  updateSummaryCards();
  renderTable();

  descInput.value = "";
  amountInput.value = "";
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = Number(e.target.getAttribute("data-id"));
    transactions = transactions.filter((item) => item.id !== id);
    saveTransactions();
    updateSummaryCards();
    renderTable();
  }
});

searchInput.addEventListener("input", renderTable);
filterTypeSelect.addEventListener("change", renderTable);

resetSampleBtn.addEventListener("click", () => {
  transactions = [...DEFAULT_TRANSACTIONS];
  saveTransactions();
  updateSummaryCards();
  renderTable();
});

// Initialize default date to today if empty and render initial state
if (!dateInput.value) {
  dateInput.value = "2026-10-27";
}
updateSummaryCards();
renderTable();
