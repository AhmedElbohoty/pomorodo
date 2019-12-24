import React, { useState, useEffect, useContext, useRef } from "react";

import { AppContext } from "../App";

const messages = {
  rest: `"يقول علي بنُ أبي طالب رضي الله عنْه: "إنَّ القُلوب تَمل كما تَمل الأبدان، فابتغُوا لها طرائفَ الحِكمة`,
  work: `سئل النبي - صلى الله عليه وسلم: أي الأعمال أحب إلى الله؟ قال: ( أدومها وإن قل. وقال: اكلفوا من الأعمال ما تطيقون ) `
};

function Timer() {
  const { todo } = useContext(AppContext);
  const [time, setTime] = useState(1500);
  const [start, setStart] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [pomodro, setPomodro] = useState(0);

  useInterval(() => {
    if (!start) return;

    if (time) {
      setTime(time - 1);
      return;
    }

    if (isRest && pomodro === 4) {
      reset();
      return;
    }

    if (!isRest) {
      setPomodro(pomodro + 1);
    }
    setTime(isRest ? 1500 : pomodro === 3 ? 900 : 300);
    setIsRest(!isRest);
    setStart(false);
  }, 1000);

  function reset() {
    setPomodro(0);
    setIsRest(false);
    setTime(1500);
    setStart(false);
  }

  const minutes = new Date(time * 1000).getUTCMinutes();
  const seconds = new Date(time * 1000).getUTCSeconds();

  return (
    <div id="l-timer">
      <h3 className="timer-pomodro">{pomodro} :عدد دورات العمل </h3>

      <h2 className="timer-wisdom">{isRest ? messages.rest : messages.work}</h2>

      <h1 className="timer-h1">{todo}</h1>

      <p className="timer">
        {minutes} : {seconds}
      </p>

      <div className="timer-btns">
        <button className="timer-btn" onClick={() => setStart(false)}>
          توقف
        </button>
        <button className="timer-btn" onClick={() => setStart(true)}>
          {isRest ? " ابدأ الراحة" : " ابدأ العمل"}
        </button>
      </div>
    </div>
  );
}

function useInterval(callback, delay) {
  const saved = useRef();

  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => saved.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Timer;
