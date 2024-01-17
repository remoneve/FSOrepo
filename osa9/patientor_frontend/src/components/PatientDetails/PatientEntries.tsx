import { Diagnosis, BaseEntry } from "../../types";
import { useState, useEffect } from "react";
import axios from "axios";

interface EntryItemProps {
  patientEntryData: BaseEntryItem,
  diagnosesData?: Diagnosis[];
}

interface BaseEntryItem extends BaseEntry {
  diagnosesData?: Diagnosis[];
}

interface EntryListProps {
  entries: BaseEntry[]
}

interface FullDiagnosisProps {
  patientCodes: string[] | undefined
  diagnosesData: Diagnosis[] | undefined
}

const FullDiagnosis = ({ patientCodes, diagnosesData }: FullDiagnosisProps) => {
  if (!patientCodes) return <div>No diagnoses</div>;
  
  const diagnosesItems = patientCodes.map(code => {
    if (!diagnosesData) return code;
    const diagnosisItem = diagnosesData.find((d) => d.code === code);
    return `${code}: ${diagnosisItem?.name}`;
  });

  return (
    <ul>
      {diagnosesItems.map(diagnosis => <li key={diagnosis}>{diagnosis}</li>)}
    </ul>
  );
};

const EntryItem = ({ patientEntryData, diagnosesData }: EntryItemProps) => {
  if (!patientEntryData.diagnosisCodes) {
    return (
      <div>
        {patientEntryData.date} <i>{patientEntryData.description}</i>
      </div>
    );
  }

  return (
    <div>
      {patientEntryData.date} <i>{patientEntryData.description}</i>
      <FullDiagnosis patientCodes={patientEntryData.diagnosisCodes} diagnosesData={diagnosesData}/>
    </div>
  );
};

const EntryList = ({ entries }: EntryListProps) => {
  const [diagnosesData, setDiagnosesData] = useState<Diagnosis[]>();

  useEffect(() => {
    axios
      .get<Diagnosis[]>(`http://localhost:3001/api/diagnoses`)
      .then((res) => setDiagnosesData(res.data));
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
      <EntryItem key={entry.id} patientEntryData={entry} diagnosesData={diagnosesData}/>)}
    </div>
  );
};


export default EntryList;