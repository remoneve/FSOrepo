import Data from '../../data/diagnoses';
import { DiagnosisEntry } from '../types';

const getDiagnoses = (): DiagnosisEntry[] => {
  return Data;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};