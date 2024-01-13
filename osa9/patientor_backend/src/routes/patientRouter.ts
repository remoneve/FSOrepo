import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSsnPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  }
  else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;