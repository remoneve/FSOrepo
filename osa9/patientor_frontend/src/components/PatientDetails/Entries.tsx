import { Diagnosis, BaseEntry } from "../../types";
import { useState, useEffect } from "react";
import axios from "axios";

interface Entry {
  date: string,
  description: string,
  diagnosisCodes?: Array<Diagnosis['code']>;
  diagnoses?: Diagnosis[];
}

interface props {
  entries : BaseEntry[]
}

interface FullDiagnosisTypes {
  diagnosisCodes: string[]
  diagnoses: Diagnosis[] | undefined
}

const FullDiagnosis = (props: FullDiagnosisTypes) => {
  const diagnosisCodes = props.diagnosisCodes;
  const diagnosesList = props.diagnoses;
  
  const patientDiagnoses = diagnosisCodes.map(code => {
    if (!diagnosesList) return code;
    const diagnosisInQ = diagnosesList.find((d) => d.code === code);
    return `${code}: ${diagnosisInQ?.name}`;
  });

  return (
    <ul>
      {patientDiagnoses.map(diagnosis => <li key={diagnosis}>{diagnosis}</li>)}
  </ul>
  );
};

const Entry = ({ date, description, diagnosisCodes, diagnoses }: Entry) => {
  if (!diagnosisCodes) {
    return (
      <div>
        {date} <i>{description}</i>
      </div>
    );
  }

  return (
    <div>
      {date} <i>{description}</i>
      <FullDiagnosis diagnosisCodes={diagnosisCodes} diagnoses={diagnoses}/>
    </div>
  );
};

const Entries = ({entries}: props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    axios
      .get<Diagnosis[]>(`http://localhost:3001/api/diagnoses`)
      .then((res) => setDiagnoses(res.data));
  }, []);
  
  if (entries.length < 1) {
    return (
      <div>
        <h2>entries</h2>
        <b><i>No entries found</i></b>
      </div>
    );
  }
  
  return (
    <div>
      <h2>entries</h2>
      {entries.map(entry => 
      <Entry key={entry.date}
      date={entry.date} 
      diagnosisCodes={entry.diagnosisCodes}
      description={entry.description}
      diagnoses={diagnoses}/>)}
    </div>
  );
};


export default Entries;