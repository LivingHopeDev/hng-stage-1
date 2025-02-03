import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const isArmstrong = (num) => {
  const digits = String(num).split("");
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), power),
    0
  );
  return sum === num;
};

const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num) => {
  if (num <= 1) return false;
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num;
};

const digitSum = (num) => {
  return String(num)
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
};

const getProperties = (num) => {
  const properties = [];
  if (isArmstrong(num)) {
    properties.push("armstrong");
  }
  properties.push(num % 2 === 0 ? "even" : "odd");
  return properties;
};

const getFunFact = async (num) => {
  try {
    const response = await axios(`http://numbersapi.com/${num}/math`);
    const fact = await response.data;
    return fact;
  } catch (error) {
    res.status(500).json({
      number: num,
      error: true,
      message: "Failed to fetch fun fact",
    });
  }
};

const classifyNumber = async (num) => {
  const properties = getProperties(num);
  const funFact = await getFunFact(num);

  return {
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(num),
    properties,
    digit_sum: digitSum(num),
    fun_fact: funFact,
  };
};

app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;

  if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
    return res.status(400).json({
      number,
      error: true,
    });
  }

  try {
    const result = await classifyNumber(Number(number));
    res.json(result);
  } catch (error) {
    res.status(500).json({
      number,
      error: true,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
