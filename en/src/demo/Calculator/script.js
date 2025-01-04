// Get display and history elements from DOM
let display = document.getElementById('display');
let history = document.getElementById('history');
let memory = 0; // Inisialisasi variabel memory

// Function to clear display contents
function clearDisplay() {
    display.innerText = '0';
}

// Function to delete the last character on the display
function deleteLast() {
    display.innerText = display.innerText.slice(0, -1) || '0';
}

// Function to add numbers to the display
function appendNumber(number) {
    if (display.innerText === '0') {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
}

// Function to add operators to the display
function appendOperator(operator) {
    if (display.innerText !== '0') {
        display.innerText += ` ${operator} `;
    }
}

// Function to calculate the result of the expression on the display
function calculateResult() {
    try {
        let result = eval(display.innerText.replace('^', '**'));
        display.innerText = result;
        addToHistory(display.innerText); // Add results to history
    } catch {
        display.innerText = 'Error';
    }
}

// Function to calculate the square root of the value in display
function calculateSquareRoot() {
    try {
        let result = Math.sqrt(eval(display.innerText));
        display.innerText = result;
        addToHistory(display.innerText); // Add results to history
    } catch {
        display.innerText = 'Error';
    }
}

// Function to delete values ​​in memory
function memoryClear() {
    memory = 0;
}

// Function to display the value in memory to the display
function memoryRecall() {
    display.innerText = memory;
}

// Function to add the value in the display to memory
function memoryAdd() {
    memory += parseFloat(display.innerText) || 0;
}

// Function to subtract the value on display from memory
function memorySubtract() {
    memory -= parseFloat(display.innerText) || 0;
}

// Function to add an entry to history
function addToHistory(entry) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerText = entry;
    history.prepend(historyItem);
}

// Function to delete all entries in history
function clearHistory() {
    history.innerHTML = '';
}