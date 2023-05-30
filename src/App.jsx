import { useState } from 'react';
import concatZero from './concatZero';

const App = function () {
  let time;
  time = new Date();

  const [hours, setHours] = useState(time.getHours());
  const [minutes, setMinutes] = useState(time.getMinutes());
  const [seconds, setSeconds] = useState(time.getSeconds());
  const [secondsWidth, setSecondsWidth] = useState('10px');

  setInterval(() => {
    const updateTime = new Date();

    setHours(concatZero(updateTime.getHours()));
    setMinutes(concatZero(updateTime.getMinutes()));
    setSeconds(concatZero(updateTime.getSeconds()));
  }, 1000);

  const clockTics = setInterval(() => {
    /* console.log(setSecondsWidth(parseInt(secondsWidth.slice(0, -2)))); */
    setSecondsWidth(parseInt(secondsWidth.slice(0, -2)) + 1 + 'px');
  }, 1000);

  return (
    <section id="clock">
      <p>
        {hours}:{minutes}:{seconds}
      </p>

      <article className="hours">
        <div id="tenHours" className="clockBar reduced">
          <span>0</span>
          <span>1</span>
          <span>2</span>
        </div>
        <div id="unitHour" className="clockBar">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>
      </article>
      <article className="minutes">
        <div id="tenMinutes" className="clockBar reduced">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <div id="unitMinutes" className="clockBar">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>
      </article>
      <article className="seconds">
        <div id="tenSeconds" className="clockBar reduced">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <div
          id="unitSeconds"
          style={{ width: secondsWidth }}
          className="clockBar"
        >
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>
      </article>
    </section>
  );
};

export default App;
