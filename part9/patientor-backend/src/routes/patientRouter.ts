import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const data = patientService.findById(req.params.id);
  if (data) {
    res.json(data);
  }

  res.status(404).end();
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = toNewPatient(req.body);
  console.log(`New patient: ${newPatient}`);
  // Add the new patient (patientService.addPatient() creates the id for us)
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;