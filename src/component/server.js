// server.js
import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';
import userRoutes from './routes/users';

const app = express();
const port = 5000;

app.use(cors());
app.use(json());

connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
