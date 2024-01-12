import { DiaryEntry } from "../types";

const Diary = ({date, visibility, weather}: DiaryEntry) => {
  return (
    <div>
      <div>
        <b>{date}</b>
      </div>
      <div>
        visibility: {visibility}
        <br/>
        weather: {weather}
      </div>
      <br/>
    </div>
  );
};

export default Diary;