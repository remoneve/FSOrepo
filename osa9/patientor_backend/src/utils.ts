import { NewPatientEntry } from "./types";

const toNewPatient = (object: unknown): NewPatientEntry => {
  console.log(object);
  const newEntry: NewPatientEntry = {
    name: "string",
    dateOfBirth: "string",
    ssn: "string",
    gender: "string",
    occupation: "string"
  };

  return newEntry;
};

export default toNewPatient;