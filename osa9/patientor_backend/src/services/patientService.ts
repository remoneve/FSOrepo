import Data from '../../data/patients';
import { PatientEntry, NonSsnPatientEntry } from '../types';

const getPatients = (): PatientEntry[] => {
  return Data;
};

const getNonSsnPatients = (): NonSsnPatientEntry[] => {
  return Data.map(({ id, name, dateOfBirth, gender, occupation }) => 
  ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
  getNonSsnPatients
};