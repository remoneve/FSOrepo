import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSsnPatients());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;