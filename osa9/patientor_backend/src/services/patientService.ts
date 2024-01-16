import patients from '../../data/patients';
import { Patient, NonSsnPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSsnPatients = (): NonSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => 
    ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getPatients,
  addPatient,
  getNonSsnPatients,
  findPatientById
};