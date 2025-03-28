Features
 Perform basic arithmetic operations: addition, subtraction, multiplication, and division.
 Handles input validation to ensure only valid numbers are processed.
 Logs requests and errors using Winston for monitoring.
 Provides meaningful error messages for invalid inputs and division by zero.


1. Install Dependencies
Run the following command to install all required dependencies:

npm install

3. Start the Microservice
Run server with:

node server.js

API Endpoints
Operation	Endpoint Format	
Addition	GET /add?num1=10&num2=5	http://localhost:3000/add?num1=10&num2=5
Subtraction	GET /subtract?num1=10&num2=5	http://localhost:3000/subtract?num1=10&num2=5
Multiplication	GET /multiply?num1=10&num2=5	http://localhost:3000/multiply?num1=10&num2=5
Division	GET /divide?num1=10&num2=5	http://localhost:3000/divide?num1=10&num2=5
Error Handling
The microservice provides meaningful error messages for invalid requests:

If inputs are not numbers:

{ "error": "Invalid input: Please provide valid numbers." }
If division by zero is attempted:

{ "error": "Cannot divide by zero." }
If an invalid operation is requested:

{ "error": "Invalid operation." }

Logging with Winston
This microservice uses Winston for logging. It records:
*All requests in logs/combined.log.
*Errors and invalid requests in logs/error.log.

Checking Log Files
To view real-time logs, use the following command in your terminal:

Get-Content logs\combined.log -Wait  for Windows (PowerShell)

