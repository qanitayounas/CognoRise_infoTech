document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('screen');
    let currentInput = '0';
    let firstValue = '';
    let operator = '';
    let shouldResetScreen = false;

    const updateScreen = (value) => {
        screen.textContent = value;
    };

    const appendNumber = (number) => {
        if (currentInput === '0' || shouldResetScreen) {
            currentInput = number;
            shouldResetScreen = false;
        } else {
            currentInput += number;
        }
        updateScreen(currentInput);
    };

    const handleOperator = (op) => {
        if (firstValue && operator && !shouldResetScreen) {
            calculate();
        }
        operator = op;
        firstValue = currentInput;
        shouldResetScreen = true;
    };

    const calculate = () => {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(currentInput);
        if (isNaN(num1) || isNaN(num2)) return;

        switch (operator) {
            case '+':
                currentInput = (num1 + num2).toString();
                break;
            case '-':
                currentInput = (num1 - num2).toString();
                break;
            case '*':
                currentInput = (num1 * num2).toString();
                break;
            case '/':
                currentInput = num2 === 0 ? 'Error' : (num1 / num2).toString();
                break;
            default:
                return;
        }
        operator = '';
        updateScreen(currentInput);
        shouldResetScreen = true;
    };

    const resetCalculator = () => {
        currentInput = '0';
        firstValue = '';
        operator = '';
        shouldResetScreen = false;
        updateScreen(currentInput);
    };

    const handleSpecialFunction = (func) => {
        switch (func) {
            case 'AC':
                resetCalculator();
                break;
            case '+/-':
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateScreen(currentInput);
                break;
            case '%':
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateScreen(currentInput);
                break;
        }
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.classList.contains('number')) {
                appendNumber(value);
            } else if (button.classList.contains('operator')) {
                if (value === '=') {
                    calculate();
                } else {
                    handleOperator(value);
                }
            } else if (button.classList.contains('function')) {
                handleSpecialFunction(value);
            }
        });
    });
});

