// Financial Data Management System
class FinanceManager {
    constructor() {
        this.data = {
            fixedIncome: [],
            variableIncome: [],
            fixedExpenses: [],
            variableExpenses: [],
            dailyExpenses: []
        };
        this.savingsPercentage = 50; // Default 50%
        this.loadData();
        this.bindEvents();
        this.updateDashboard();
        this.renderTransactions();
        this.initializeDateInputs();
    }

    // Initialize date inputs with current date
    initializeDateInputs() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('variableIncomeDate').value = today;
        document.getElementById('variableExpenseDate').value = today;
        document.getElementById('dailyExpenseDate').value = today;
    }

    // Load data from localStorage
    loadData() {
        const savedData = localStorage.getItem('financeData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        }
        
        const savedPercentage = localStorage.getItem('savingsPercentage');
        if (savedPercentage) {
            this.savingsPercentage = parseInt(savedPercentage);
        }
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('financeData', JSON.stringify(this.data));
        localStorage.setItem('savingsPercentage', this.savingsPercentage.toString());
    }

    // Bind form events
    bindEvents() {
        // Form submissions
        document.getElementById('fixedIncomeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addFixedIncome();
        });

        document.getElementById('variableIncomeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addVariableIncome();
        });

        document.getElementById('fixedExpenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addFixedExpense();
        });

        document.getElementById('variableExpenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addVariableExpense();
        });

        document.getElementById('dailyExpenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addDailyExpense();
        });

        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Savings percentage modal
        document.getElementById('savedAmountCard').addEventListener('click', () => {
            this.openSavingsModal();
        });

        document.getElementById('closeSavingsModal').addEventListener('click', () => {
            this.closeSavingsModal();
        });

        document.getElementById('cancelSavingsModal').addEventListener('click', () => {
            this.closeSavingsModal();
        });

        document.getElementById('saveSavingsPercentage').addEventListener('click', () => {
            this.saveSavingsPercentage();
        });

        document.getElementById('savingsPercentageSlider').addEventListener('input', (e) => {
            this.updateSavingsPreview(e.target.value);
        });

        // Initialize dark mode
        this.initializeDarkMode();
    }

    // Dark mode functionality
    initializeDarkMode() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }

    toggleDarkMode() {
        const isDarkMode = document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Add fixed income
    addFixedIncome() {
        const description = document.getElementById('fixedIncomeDescription').value;
        const amount = parseFloat(document.getElementById('fixedIncomeAmount').value);

        if (description && amount > 0) {
            const income = {
                id: Date.now(),
                description,
                amount,
                type: 'fixed'
            };

            this.data.fixedIncome.push(income);
            this.saveData();
            this.updateDashboard();
            this.renderTransactions();
            this.clearForm('fixedIncomeForm');
            this.showNotification('Ganho fixo adicionado com sucesso!', 'success');
        }
    }

    // Add variable income
    addVariableIncome() {
        const description = document.getElementById('variableIncomeDescription').value;
        const amount = parseFloat(document.getElementById('variableIncomeAmount').value);
        const date = document.getElementById('variableIncomeDate').value;

        if (description && amount > 0 && date) {
            const income = {
                id: Date.now(),
                description,
                amount,
                date,
                type: 'variable'
            };

            this.data.variableIncome.push(income);
            this.saveData();
            this.updateDashboard();
            this.renderTransactions();
            this.clearForm('variableIncomeForm');
            this.showNotification('Ganho variável adicionado com sucesso!', 'success');
        }
    }

    // Add fixed expense
    addFixedExpense() {
        const description = document.getElementById('fixedExpenseDescription').value;
        const amount = parseFloat(document.getElementById('fixedExpenseAmount').value);

        if (description && amount > 0) {
            const expense = {
                id: Date.now(),
                description,
                amount,
                type: 'fixed'
            };

            this.data.fixedExpenses.push(expense);
            this.saveData();
            this.updateDashboard();
            this.renderTransactions();
            this.clearForm('fixedExpenseForm');
            this.showNotification('Conta fixa adicionada com sucesso!', 'success');
        }
    }

    // Add variable expense
    addVariableExpense() {
        const description = document.getElementById('variableExpenseDescription').value;
        const amount = parseFloat(document.getElementById('variableExpenseAmount').value);
        const date = document.getElementById('variableExpenseDate').value;

        if (description && amount > 0 && date) {
            const expense = {
                id: Date.now(),
                description,
                amount,
                date,
                type: 'variable'
            };

            this.data.variableExpenses.push(expense);
            this.saveData();
            this.updateDashboard();
            this.renderTransactions();
            this.clearForm('variableExpenseForm');
            this.showNotification('Conta variável adicionada com sucesso!', 'success');
        }
    }

    // Add daily expense
    addDailyExpense() {
        const description = document.getElementById('dailyExpenseDescription').value;
        const amount = parseFloat(document.getElementById('dailyExpenseAmount').value);
        const date = document.getElementById('dailyExpenseDate').value;

        if (description && amount > 0 && date) {
            const expense = {
                id: Date.now(),
                description,
                amount,
                date,
                type: 'daily'
            };

            this.data.dailyExpenses.push(expense);
            this.saveData();
            this.updateDashboard();
            this.renderTransactions();
            this.clearForm('dailyExpenseForm');
            this.showNotification('Gasto diário adicionado com sucesso!', 'success');
        }
    }

    // Remove transaction
    removeTransaction(type, id) {
        if (confirm('Tem certeza que deseja remover este item?')) {
            this.data[type] = this.data[type].filter(item => item.id !== id);
            this.saveData();
            this.updateDashboard();
            this.renderTransactions();
            this.showNotification('Item removido com sucesso!', 'success');
        }
    }

    // Clear form
    clearForm(formId) {
        document.getElementById(formId).reset();
        // Reset date inputs to today
        if (formId === 'variableIncomeForm') {
            document.getElementById('variableIncomeDate').value = new Date().toISOString().split('T')[0];
        } else if (formId === 'variableExpenseForm') {
            document.getElementById('variableExpenseDate').value = new Date().toISOString().split('T')[0];
        } else if (formId === 'dailyExpenseForm') {
            document.getElementById('dailyExpenseDate').value = new Date().toISOString().split('T')[0];
        }
    }

    // Calculate totals
    calculateTotals() {
        const totalFixedIncome = this.data.fixedIncome.reduce((sum, item) => sum + item.amount, 0);
        const totalVariableIncome = this.data.variableIncome.reduce((sum, item) => sum + item.amount, 0);
        const totalEarnings = totalFixedIncome + totalVariableIncome;

        const totalFixedExpenses = this.data.fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
        const totalVariableExpenses = this.data.variableExpenses.reduce((sum, item) => sum + item.amount, 0);
        const totalDailyExpenses = this.data.dailyExpenses.reduce((sum, item) => sum + item.amount, 0);
        const totalExpenses = totalFixedExpenses + totalVariableExpenses + totalDailyExpenses;

        const savedAmount = totalEarnings * (this.savingsPercentage / 100); // Dynamic percentage of earnings
        const availableBalance = (totalEarnings * ((100 - this.savingsPercentage) / 100)) - totalExpenses; // Remaining percentage minus expenses

        return {
            totalEarnings,
            totalExpenses,
            savedAmount,
            availableBalance
        };
    }

    // Update dashboard
    updateDashboard() {
        const totals = this.calculateTotals();

        document.getElementById('totalEarnings').textContent = this.formatCurrency(totals.totalEarnings);
        document.getElementById('totalExpenses').textContent = this.formatCurrency(totals.totalExpenses);
        document.getElementById('savedAmount').textContent = this.formatCurrency(totals.savedAmount);
        document.getElementById('availableBalance').textContent = this.formatCurrency(totals.availableBalance);
        document.getElementById('savingsPercentageDisplay').textContent = this.savingsPercentage;

        // Show alert if spending more than available
        this.checkSpendingAlert(totals);
    }

    // Check spending alert
    checkSpendingAlert(totals) {
        const alertSection = document.getElementById('alertSection');
        const alertMessage = document.getElementById('alertMessage');

        if (totals.availableBalance < 0) {
            alertMessage.textContent = `Atenção! Você está gastando R$ ${this.formatCurrency(Math.abs(totals.availableBalance))} a mais do que pode.`;
            alertSection.classList.remove('hidden');
        } else if (totals.availableBalance < totals.totalEarnings * 0.10) {
            alertMessage.textContent = 'Cuidado! Você está próximo do limite de gastos.';
            alertSection.classList.remove('hidden');
        } else {
            alertSection.classList.add('hidden');
        }
    }

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    }

    // Show notification
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle mr-2"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Render transactions
    renderTransactions() {
        this.renderIncomeList();
        this.renderExpenseList();
    }

    // Render income list
    renderIncomeList() {
        const incomeList = document.getElementById('incomeList');
        const allIncome = [
            ...this.data.fixedIncome.map(item => ({ ...item, category: 'Fixo' })),
            ...this.data.variableIncome.map(item => ({ ...item, category: 'Variável' }))
        ];

        if (allIncome.length === 0) {
            incomeList.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-4">Nenhum ganho registrado ainda</p>';
            return;
        }

        incomeList.innerHTML = allIncome.map(item => `
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex-1">
                    <div class="flex items-center">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${item.description}</span>
                        <span class="ml-2 px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">${item.category}</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold text-green-600 dark:text-green-400">${this.formatCurrency(item.amount)}</span>
                        ${item.date ? `<span class="ml-2">${this.formatDate(item.date)}</span>` : ''}
                    </div>
                </div>
                <button 
                    onclick="financeManager.removeTransaction('${item.type === 'fixed' ? 'fixedIncome' : 'variableIncome'}', ${item.id})"
                    class="ml-2 p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                    title="Remover"
                >
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
    }

    // Render expense list
    renderExpenseList() {
        const expenseList = document.getElementById('expenseList');
        const allExpenses = [
            ...this.data.fixedExpenses.map(item => ({ ...item, category: 'Fixo' })),
            ...this.data.variableExpenses.map(item => ({ ...item, category: 'Variável' })),
            ...this.data.dailyExpenses.map(item => ({ ...item, category: 'Diário' }))
        ];

        if (allExpenses.length === 0) {
            expenseList.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-4">Nenhum gasto registrado ainda</p>';
            return;
        }

        expenseList.innerHTML = allExpenses.map(item => `
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex-1">
                    <div class="flex items-center">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${item.description}</span>
                        <span class="ml-2 px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">${item.category}</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold text-red-600 dark:text-red-400">${this.formatCurrency(item.amount)}</span>
                        ${item.date ? `<span class="ml-2">${this.formatDate(item.date)}</span>` : ''}
                    </div>
                </div>
                <button 
                    onclick="financeManager.removeTransaction('${this.getExpenseType(item.type)}', ${item.id})"
                    class="ml-2 p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                    title="Remover"
                >
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
    }

    // Get expense type for removal
    getExpenseType(type) {
        switch (type) {
            case 'fixed': return 'fixedExpenses';
            case 'variable': return 'variableExpenses';
            case 'daily': return 'dailyExpenses';
            default: return 'dailyExpenses';
        }
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    // Open savings modal
    openSavingsModal() {
        document.getElementById('savingsModal').classList.remove('hidden');
        document.getElementById('savingsPercentageSlider').value = this.savingsPercentage;
        this.updateSavingsPreview(this.savingsPercentage);
    }

    // Close savings modal
    closeSavingsModal() {
        document.getElementById('savingsModal').classList.add('hidden');
    }

    // Update savings preview
    updateSavingsPreview(percentage) {
        document.getElementById('savingsPercentageValue').textContent = percentage + '%';
        document.getElementById('previewSavings').textContent = percentage + '%';
        document.getElementById('previewAvailable').textContent = (100 - percentage) + '%';
    }

    // Save savings percentage
    saveSavingsPercentage() {
        const newPercentage = parseInt(document.getElementById('savingsPercentageSlider').value);
        this.savingsPercentage = newPercentage;
        this.saveData();
        this.updateDashboard();
        this.closeSavingsModal();
        this.showNotification(`Porcentagem de economia atualizada para ${newPercentage}%!`, 'success');
    }
}

// Initialize the finance manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.financeManager = new FinanceManager();
});
