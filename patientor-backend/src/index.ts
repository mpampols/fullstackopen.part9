import express from 'express';
import diagnoseRouter from './routes/diagnoses';

const app = express();

app.use(express.json());

const PORT = 3003;

app.get('/ping', (_req, res) => {
  console.log('pong');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});