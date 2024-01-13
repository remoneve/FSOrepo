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
        <div>
          date <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)}/>
        </div>
        <div>
          visibility:
          <input type="radio" id="vis1" name="visibility" value={"great"} onChange={(event) => setNewVisibility(event.target.value)}></input>
          <label htmlFor="vis1">great</label>

          <input type="radio" id="vis2" name="visibility" value={"good"} onChange={(event) => setNewVisibility(event.target.value)}></input>
          <label htmlFor="vis2">good</label>

          <input type="radio" id="vis3" name="visibility" value={"ok"} onChange={(event) => setNewVisibility(event.target.value)}></input>
          <label htmlFor="vis3">ok</label>

          <input type="radio" id="vis4" name="visibility" value={"poor"} onChange={(event) => setNewVisibility(event.target.value)}></input>
          <label htmlFor="vis4">poor</label>
        </div>
        <div>
          weather:
          <input type="radio" id="weather1" name="weather" value={"sunny"} onChange={(event) => setNewWeather(event.target.value)}></input>
          <label htmlFor="weather1">sunny</label>

          <input type="radio" id="weather2" name="weather" value={"rainy"} onChange={(event) => setNewWeather(event.target.value)}></input>
          <label htmlFor="weather2">rainy</label>

          <input type="radio" id="weather3" name="weather" value={"cloudy"} onChange={(event) => setNewWeather(event.target.value)}></input>
          <label htmlFor="weather3">cloudy</label>

          <input type="radio" id="weather4" name="weather" value={"stormy"} onChange={(event) => setNewWeather(event.target.value)}></input>
          <label htmlFor="weather4">stormy</label>

          <input type="radio" id="weather5" name="weather" value={"windy"} onChange={(event) => setNewWeather(event.target.value)}></input>
          <label htmlFor="weather5">windy</label>
        </div>
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
