import patients from '../../data/patients';
import { PatientEntry, NonSsnPatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSsnPatients = (): NonSsnPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => 
  ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findPatientById = (id: string): PatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getPatients,
  addPatient,
  getNonSsnPatients,
  findPatientById
};