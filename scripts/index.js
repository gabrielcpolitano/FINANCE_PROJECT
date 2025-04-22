// Get all necessary elements from the page
const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const balance = document.getElementById("balance");
const filter = document.getElementById("filter");

// Load transactions from local storage or start with an empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// When the user submits the form
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop page from refreshing

  // Get values from the form inputs
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  // Create a new transaction object
  const transaction = {
    id: Date.now(), // unique ID based on current time
    description,
    amount: type === "expense" ? -amount : amount,
    type
  };

  // Add it to the transactions list
  transactions.push(transaction);

  // Save to localStorage and refresh the UI
  saveAndUpdate();

  // Clear the form inputs
  form.reset();
});

// Update UI when the filter changes
filter.addEventListener("change", updateUI);

// Save data and update the screen
function saveAndUpdate() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
}

// Function to update the list and balance
function updateUI() {
  list.innerHTML = ""; // Clear old list
  let total = 0;
  const selectedFilter = filter.value;

  transactions.forEach(t => {
    // Skip if current item doesn't match the filter
    if (selectedFilter !== "all" && t.type !== selectedFilter) return;

    // Create a list item
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center ${
      t.amount < 0 ? "list-group-item-danger" : "list-group-item-success"
    }`;

    // Add transaction content
    li.innerHTML = `
      <span contenteditable="true" onblur="editDescription(${t.id}, this.innerText)">
        ${t.description}
      </span>
      <span>
        $${Math.abs(t.amount).toFixed(2)}
        <button class="btn btn-sm btn-danger ms-2" onclick="deleteTransaction(${t.id})">Delete</button>
      </span>
    `;

    list.appendChild(li);
    total += t.amount;
  });

  // Show the total balance
  balance.textContent = total.toFixed(2);
}

// Delete a transaction by ID
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveAndUpdate();
}

// Edit the description inline
function editDescription(id, newDescription) {
  const transaction = transactions.find(t => t.id === id);
  if (transaction) {
    transaction.description = newDescription;
    saveAndUpdate();
  }
}

// Export all transactions as a CSV file
function exportCSV() {
  let csv = "Description,Amount,Type\n";
  transactions.forEach(t => {
    csv += `${t.description},${t.amount},${t.type}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
}


// Load data and show it when page is opened
window.addEventListener("load", updateUI);
