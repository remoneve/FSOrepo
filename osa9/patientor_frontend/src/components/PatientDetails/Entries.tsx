import { BaseEntry, Patient } from "../../types";

const Entry = ({ date, description, diagnosisCodes}: BaseEntry) => {
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
      <ul>
        <li>{diagnosisCodes.map(diag => diag)}</li>
      </ul>
    </div>
  );
};

const Entries = (patient: Patient) => {
  return (
    <div>
      <h2>entries</h2>
      {patient.entries.map(entry => <Entry key={entry.id}
      id={entry.id}
      specialist={entry.specialist} 
      date={entry.date} 
      diagnosisCodes={entry.diagnosisCodes}
      description={entry.description}/>)}
    </div>
  );
};


export default Entries;