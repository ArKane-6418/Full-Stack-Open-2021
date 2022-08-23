import express from 'express';
import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));

app.set('json spaces', 40);


const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});