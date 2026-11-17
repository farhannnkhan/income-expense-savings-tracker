# My Money Tracker — Monthly Income, Expenses & Savings Manager

**Course:** Project Studio (CSD0111) — Mini Project  
**Student Name:** Farhan Khan 
**Roll Number:** BETN1CS26105
**Program:** B.Tech Computer Science and Engineering (1st Year)  
**Institution:** ITM University, Gwalior  

---

## 1. Project Description

**My Money Tracker** is a browser-based personal finance tracker designed to record monthly income sources, daily expenses, and net monthly savings in Indian Rupees (`₹`). The web application helps students and individuals track where their money comes from, categorize everyday spending, and monitor their monthly savings balance without needing an external backend server.

---

## 2. Key Features

1. **Live Financial Summary Cards:** Automatically calculates and updates **Total Income** (`₹22,300` sample baseline), **Total Expenses** (`₹6,199` sample baseline), **Monthly Savings** (`₹16,101` sample baseline), and the monthly savings percentage.
2. **Client-Side Form Validation:** Validates transaction descriptions, positive Rupee amounts, and dates before adding an entry to the ledger.
3. **Interactive Transaction Ledger:** Displays all recorded entries in a structured table with color-coded `Income` and `Expense` badges.
4. **Search & Type Filtering:** Allows instant keyword search by description or category and filtering by `All Types`, `Income Only`, or `Expense Only`.
5. **Delete & Reset Controls:** Supports deleting individual rows with instant recalculation, as well as resetting back to the baseline dataset.
6. **Persistent Storage (`localStorage`):** Saves all added or modified entries directly in the browser so records remain intact across page refreshes.

---

## 3. Technologies Used

- **HTML5:** Semantic structure (`<header>`, `<main>`, `<section>`, `<form>`, `<table>`, `<footer>`).
- **CSS3:** Responsive CSS Grid and Flexbox layouts, clean card styling, and mobile breakpoints.
- **JavaScript (ES6+):** DOM manipulation, form validation, array filtering/reduction, INR currency formatting, and `localStorage` persistence.

---

## 4. Folder Structure

```text
CSD0111_Mini_Project/
├── 01_Word_Documentation/
│   └── Project_Report.docx
├── 02_Excel_Workbook/
│   └── Project_Data.xlsx
├── 03_PowerPoint/
│   └── Project_Presentation.pptx
├── 04_Website/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── images/
├── 05_Screenshots/
│   └── Project_Screenshots/
└── README.md
```

---

## 5. How to Run the Website

1. Download or clone this repository to your computer.
2. Open the `04_Website` folder.
3. Double-click `index.html` to open it in any modern web browser (Google Chrome, Microsoft Edge, Firefox, or Safari).
4. Use the **Add income or expense** form to record new entries, test search/filter controls, or click **Delete** to remove an entry.
