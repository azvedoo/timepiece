import { useState } from 'react';
import concatZero from './concatZero';

const App = function () {
  let time;
  time = new Date();

  const [hours, setHours] = useState(time.getHours());
  const [minutes, setMinutes] = useState(time.getMinutes());
  const [seconds, setSeconds] = useState(time.getSeconds());

  setInterval(() => {
    const updateTime = new Date();

    setHours(concatZero(updateTime.getHours()));
    setMinutes(concatZero(updateTime.getMinutes()));
    setSeconds(concatZero(updateTime.getSeconds()));
  }, 1000);

  return (
    <section id="clock">
      <p>
        {hours}:{minutes}:{seconds}
      </p>

      <article className="hours">
        <div id="tenHours" className="clockBar reduced"></div>
        <div id="unitHour" className="clockBar"></div>
      </article>
      <article className="minutes">
        <div id="tenMinutes" className="clockBar reduced"></div>
        <div id="unitMinutes" className="clockBar"></div>
      </article>
      <article className="seconds">
        <div id="tenSeconds" className="clockBar reduced"></div>
        <div id="unitSeconds" className="clockBar"></div>
      </article>
    </section>
  );
};

export default App;
