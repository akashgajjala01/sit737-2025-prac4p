const express = require('express');
const winston = require('winston');

const app = express();
const PORT = 3000;

// Configure Winston Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Function to validate numbers
const validateNumbers = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return 'Invalid input: Please provide valid numbers.';
    }
    return null;
};

// Arithmetic Operations API
app.get('/:operation', (req, res) => {
    const { operation } = req.params;
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    // Validate inputs
    const errorMsg = validateNumbers(num1, num2);
    if (errorMsg) {
        logger.error(`Invalid request: ${req.originalUrl}`);
        return res.status(400).json({ error: errorMsg });
    }

    let result;
    switch (operation) {
        case 'add': result = num1 + num2; break;
        case 'subtract': result = num1 - num2; break;
        case 'multiply': result = num1 * num2; break;
        case 'divide':
            if (num2 === 0) {
                logger.error('Division by zero attempt.');
                return res.status(400).json({ error: 'Cannot divide by zero.' });
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation.' });
    }

    logger.info(`New ${operation} operation: ${num1} ${operation} ${num2} = ${result}`);
    res.json({ operation, num1, num2, result });
});

app.listen(PORT, () => {
    console.log(`Calculator microservice running on http://localhost:${PORT}`);
});
