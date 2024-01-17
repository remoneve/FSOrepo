import { Patient } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import PatientEntries from "./PatientEntries";

interface PatientData {
  id: string
}

const PatientDetails = ({id}: PatientData) => {
  const [patient, setPatient] = useState<Patient>();
  
  useEffect(() => {
    axios
      .get<Patient>(`http://localhost:3001/api/patients/${id}`)
      .then((res) => setPatient(res.data));
  }, [id]);

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

      <PatientEntries entries={patient.entries} />
    </div>
  );
};

export default PatientDetails;