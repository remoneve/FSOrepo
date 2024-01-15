import { Patient } from "../types";

interface PatientDataTypes {
  data: Patient | null | undefined;
}

const PatientDetails = (props: PatientDataTypes) => {
  const patient = props.data;

  if (!patient) {
    return (
      <div><b>No data can be found</b></div>
    );
  }
  
  return (
    <div>
      <h2>{patient.name}</h2>
      <b>Gender: {patient.gender}</b>
      <p>occupation: {patient.occupation}</p>
      <p>ssn {patient.ssn}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>
    </div>
  );
};

export default PatientDetails;