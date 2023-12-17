import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  let height = Number(0);
  let weight = Number(0);
  
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    height = Number(req.query.height),
    weight = Number(req.query.weight);
    const result = calculateBmi(height, weight);

    res.json({"weight": weight, "height": height, "bmi": result});
  } else {
    res.json({"error": "malformatted parameters"});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});