/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

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


app.post('/exercises', (req, res) => {
  const {daily_exercises, target} = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).send({"error": "parameters missing"});
  }

  if (isNaN(Number(target))) return res.status(400).send({"error": "malformatted parameters"});

  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(Number(daily_exercises[i]))) return res.status(400).json({"error": "malformatted parameters"});
  }

  return res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});