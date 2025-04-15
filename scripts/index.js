const form = document.getElementById("transaction-form");
        const list = document.getElementById("transaction-list");
        const balance = document.getElementById("balance");
        const filter = document.getElementById("filter");

        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const description = document.getElementById("description").value;
            const amount = parseFloat(document.getElementById("amount").value);
            const type = document.getElementById("type").value;

            const transaction = {
                id: Date.now(),
                description,
                amount: type === "expense" ? -amount : amount,
                type
            };

            transactions.push(transaction);
            saveAndUpdate();
            form.reset();
        });

        filter.addEventListener("change", updateUI);

        function saveAndUpdate() {
            localStorage.setItem("transactions", JSON.stringify(transactions));
            updateUI();
        }

        function updateUI() {
            list.innerHTML = "";
            let total = 0;
            const selectedFilter = filter.value;

            transactions.forEach(t => {
                if (selectedFilter !== "all" && t.type !== selectedFilter) return;
                const li = document.createElement("li");
                li.className = `list-group-item d-flex justify-content-between align-items-center ${t.amount < 0 ? 'list-group-item-danger' : 'list-group-item-success'}`;
                li.innerHTML = `
                    <span contenteditable="true" onblur="editDescription(${t.id}, this.innerText)">${t.description}</span>
                    <span>
                        $${Math.abs(t.amount).toFixed(2)}
                        <button class="btn btn-sm btn-danger ms-2" onclick="deleteTransaction(${t.id})">Delete</button>
                    </span>
                `;
                list.appendChild(li);
                total += t.amount;
            });

            balance.textContent = total.toFixed(2);
        }

        function deleteTransaction(id) {
            transactions = transactions.filter(t => t.id !== id);
            saveAndUpdate();
        }

        function editDescription(id, newDescription) {
            const index = transactions.findIndex(t => t.id === id);
            if (index !== -1) {
                transactions[index].description = newDescription;
                saveAndUpdate();
            }
        }

        function exportCSV() {
            let csv = "Description,Amount,Type\n";
            transactions.forEach(t => {
                csv += `${t.description},${t.amount},${t.type}\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("download", "transactions.csv");
            a.click();
        }

        function toggleDarkMode() {
            document.body.classList.toggle("dark-mode");
        }

        window.addEventListener("load", updateUI);