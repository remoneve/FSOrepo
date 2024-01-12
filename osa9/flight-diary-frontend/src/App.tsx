import { useEffect, useState } from "react";
import { getDiaries, postDiaryEntry } from "./services/diaryService";
import { DiaryEntry } from "./types";
import Diary from "./components/Diary";
import axios from "axios";
import ErrorDisplay from "./components/ErrorDisplay";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const createEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      id: diaries.length + 1,
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    };

    try {
      const response = await postDiaryEntry(entryToAdd);
      setDiaries(diaries.concat(response));

      setNewDate('');
      setNewVisibility('');
      setNewWeather('');
      setNewComment('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response!.data);
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }
  };

  return (
    <div>
      <form onSubmit={createEntry}>
        <h2>Add a new diary</h2>
        <ErrorDisplay errorMessage={errorMessage}/>
        date <input value={newDate} onChange={(event) => setNewDate(event.target.value)}/> <br/>
        visibility <input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)}/> <br/>
        weather <input value={newWeather} onChange={(event) => setNewWeather(event.target.value)}/> <br/>
        comment <input value={newComment} onChange={(event) => setNewComment(event.target.value)}/> <br/>
        <button>add</button>
      </form>
      <div>
        <h2>Diary entries</h2>
        {diaries.map(diary => 
          <Diary key={diary.id} id={diary.id} date={diary.date} 
            weather={diary.weather} visibility={diary.visibility} />
        )}
      </div>
    </div>
  );
};

export default App;
