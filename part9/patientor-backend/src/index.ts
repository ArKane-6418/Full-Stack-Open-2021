import express from 'express';
import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';
import pingRouter from './routes/pingRouter';
import cors from 'cors';

const app = express();
app.use(cors());

app.set('json spaces', 40);


const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);
app.use('/api/ping', pingRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});