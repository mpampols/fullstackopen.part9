import express from 'express';
import { calculateExercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (req.query.weight === undefined || req.query.height === undefined) {
    res.send({
      error: "missing parameters"
    });
  }

  const response = {
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight)
  };

  res.send(response);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (target === undefined || daily_exercises === undefined) {
    res.send({
      error: "parameters missing"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (typeof target === "number" && !Array.isArray(daily_exercises)) {
    res.send({
      error: "malformatted parameters"
    });
  }

  const result = calculateExercises(target, daily_exercises);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});