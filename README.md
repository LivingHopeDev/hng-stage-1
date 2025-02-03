# Number Classifier API

This API provides mathematical properties and fun facts about numbers.

## Features

- Determines if a number is prime
- Determines if a number is perfect
- Identifies Armstrong numbers
- Calculates digit sum
- Provides number properties (odd/even, Armstrong)
- Fetches fun mathematical facts

## Technologies Used

- Node.js
- Express.js
- CORS middleware

## API Specification

### Endpoint

```
GET localhost:3000/api/classify-number?number=371
```

- URL: `GET /`
- Description: Returns basic information in JSON format

### Success Response (200 OK)

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Response (400 Bad Request)

```json
{
  "number": "alphabet",
  "error": true
}
```

## Local Development Setup

1. Clone the repository:

```bash
git clone https://github.com/LivingHopeDev/hng-stage-1
cd hng-stage-1
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`
