let currentHistory = '';
let operationHistory = [];

function addToHistory(value) {
    currentHistory += value;
    document.getElementById('history').value = currentHistory;
}

function calculate() {
    if (currentHistory) {
        try {
            const result = eval(currentHistory);
            document.getElementById('result').value = result;
            const operationInfo = {
                operation: currentHistory,
                result: result,
                timestamp: new Date()
            };
            operationHistory.push(operationInfo);
            currentHistory = '';
            updateHistoryDisplay();
        } catch (error) {
            document.getElementById('result').value = 'Error';
        }
    }
}

function clearDisplay() {
    currentHistory = '';
    document.getElementById('history').value = '';
    document.getElementById('result').value = '';
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('operationHistory');
    historyContainer.innerHTML = '';

    for (let i = 0; i < operationHistory.length; i++) {
        const operationItem = document.createElement('div');
        const timestamp = new Date(operationHistory[i].timestamp).toLocaleString();
        operationItem.textContent = `${timestamp}: ${operationHistory[i].operation} = ${operationHistory[i].result}`;
        operationItem.setAttribute('data-index', i);
        historyContainer.appendChild(operationItem);
    }
}

function displayHistory(event) {
    const historyIndex = event.target.getAttribute('data-index');

    if (historyIndex !== null) {
        const selectedOperation = operationHistory[historyIndex].operation;
        currentHistory = selectedOperation;
        document.getElementById('history').value = selectedOperation;
    }
}

updateHistoryDisplay();
