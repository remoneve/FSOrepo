import { useEffect, useState } from "react";
import axios from "axios";
import { DiaryEntry } from "./types";

const App = () => {
  //const [newDiary, setNewDiary] = useState<DiaryEntry>();
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data);
    });
  }, []);

  const Diary = ({date, visibility, weather}: DiaryEntry) => {
    return (
      <p>
        <div>
        <b>{date}</b>
        </div>
        <div>
          visibility: {visibility}
          <br/>
          weather: {weather}
        </div>
      </p>
    );
  };

  return (
    <div>
      <form>
      </form>

      <div>
        {diaries.map(diary => 
          <Diary key={diary.id} id={diary.id} date={diary.date} 
          weather={diary.weather} visibility={diary.visibility} />
          )}
      </div>
    </div>
  );
};

export default App;
