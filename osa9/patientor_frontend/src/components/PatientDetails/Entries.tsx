import { Diagnosis, BaseEntry } from "../../types";

interface Entry {
  date: string,
  description: string,
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface props {
  entries : BaseEntry[]
}

const Entry = ({ date, description, diagnosisCodes}: Entry) => {
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
        {diagnosisCodes.map(diagnosis => <li key={diagnosis}>{diagnosis}</li>)}
      </ul>
    </div>
  );
};

const Entries = ({entries}: props) => {
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
      description={entry.description}/>)}
    </div>
  );
};


export default Entries;