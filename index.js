let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');


totalAmountCell.textContent =  `$${totalAmount}`;
var chrt = document.getElementById("chartId").getContext("2d");
var initialData = {
    labels: ["Food", "Transportation", "Housing", "Personal", "Other"],
    datasets: [{
        data: [0, 0, 0, 0, 0],
        weight: 4,
        backgroundColor: ['#DC758F', '#688B41', '#6b3e26', '#ffcb85', '#fdf5c9'],
        hoverOffset: 3
    }],
};

var chartId = new Chart(chrt, {
    type: 'pie',
    data: initialData,
    options: {
        responsive: false,
    },
});

addBtn.addEventListener('click', function() {
    var category = categorySelect.value;
    var amount = amountInput.value;
    var date = dateInput.value;

    var amountt = amount.replace(/[^0-9.]/g, '');
    var formattedValue = `${amountt}`;
    amount = Number(formattedValue);
    if (category === '' ) {
        alert('Please enter valid data');
        return;
    }
    if (isNaN(amount) || amount <= 0 || date === '') {
        alert('Please enter a valid amount');
        return;
    }
    if ( date === '') {
        alert('Please enter a valid date');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    totalAmount += amount;
    totalAmountCell.textContent =  `$${totalAmount}`;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'x';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expensesTableBody.removeChild(newRow);
        updateChartData();
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = `$${expense.amount}`;
    dateCell.textContent = expense.date;
    //Removing the border of the cell
    deleteCell.appendChild(deleteBtn);
    updateChartData();
 // Clear the forms after someone inserts something
    categorySelect.value = 'Food';
    amountInput.value = '';
    dateInput.value = '';

});

function updateChartData() {
    var numFood = 0;
    var numT = 0;
    var numHousing = 0;
    var numPersonal = 0;
    var numOther = 0;

    for (const expense of expenses) {
        switch (expense.category) {
            case 'Food':
                numFood += expense.amount;
                break;
            case 'Transportation':
                numT += expense.amount;
                break;
            case 'Housing':
                numHousing += expense.amount;
                break;
            case 'Personal':
                numPersonal += expense.amount;
                break;
            case 'Other':
                numOther += expense.amount;
                break;
        }
    }
    
    

    var newData = {
        labels: ["Food", "Transportation", "Housing", "Personal", "Other"],
        datasets: [{
            data: [numFood, numT, numHousing, numPersonal, numOther],
            backgroundColor: ['#DC758F', '#688B41', '#6b3e26', '#ffcb85', '#fdf5c9'],
            hoverOffset: 3
        }],
    };

    chartId.data = newData;
    chartId.update();
}
