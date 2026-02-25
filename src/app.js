import express from 'express';
import apiRouter from './routes/apiRouter.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(','),
    credentials: true,
  }),
);
app.use(express.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ massage: err.massage || 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT} ...`);
});
