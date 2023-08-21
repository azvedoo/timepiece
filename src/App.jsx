import { useState, useEffect, useRef } from 'react';
import concatZero from './functions/concatZero';
import Github from './svg/Github';
import Pallete from './svg/Pallete';

let positionMetric;
let childTenNumbersMetric, childSixNumbersMetric, childThreeNumbersMetric;
let transitionMetric = '';

let intervalMetric = {
  tenHours: '',
  hours: '',
  tenMinutes: '',
  minutes: '',
  tenSeconds: '',
  seconds: '',
};

const App = function () {
  const unitSecondsRef = useRef(null);
  const tenMinutesRef = useRef(null);
  const tenHoursRef = useRef(null);

  let time;
  time = new Date();

  const [hours, setHours] = useState(time.getHours());
  const [minutes, setMinutes] = useState(time.getMinutes());
  const [seconds, setSeconds] = useState(time.getSeconds());

  const [tenHoursPosition, setTenHoursPosition] = useState('0px');
  const [hoursPosition, setHoursPosition] = useState('0px');
  const [tenMinutesPosition, setTenMinutesPosition] = useState('0px');
  const [minutesPosition, setMinutesPosition] = useState('0px');
  const [tenSecondsPosition, setTenSecondsPosition] = useState('0px');
  const [secondsPosition, setSecondsPosition] = useState('0px');

  /* =============== SET REGULAR TIMER BLOCK CODE ============= */

  setTimeout(() => {
    transitionMetric = '0.3s';
  }, 1000);

  /* ============== SET CLOCK BARS BLOCK CODE ============= */

  useEffect(() => {
    if (unitSecondsRef.current) {
      const refElementHeight = unitSecondsRef.current.offsetHeight;
      const refElementChilds = unitSecondsRef.current.childElementCount;

      positionMetric = refElementHeight / refElementChilds;
      childTenNumbersMetric = unitSecondsRef.current.childElementCount - 1;
      childSixNumbersMetric = tenMinutesRef.current.childElementCount - 1;
      childThreeNumbersMetric = tenHoursRef.current.childElementCount - 1;
    }
  }, []);

  /* ------- TEN HOURS USE EFFECT ------ */

  intervalMetric.tenHours = () => {
    setTenHoursPosition((prevPosition) => {
      const currentPosition = parseInt(prevPosition.slice(0, -2));
      if (currentPosition < -(positionMetric * childThreeNumbersMetric - 10)) {
        setInterval(intervalMetric.minutes(), 60000);
        return '0px';
      }
      const position = currentPosition - positionMetric;

      return position + 'px';
    });
  };

  /* ------- UNIT HOURS USE EFFECT ------ */

  intervalMetric.hours = () => {
    setHoursPosition((prevPosition) => {
      const currentPosition = parseInt(prevPosition.slice(0, -2));
      if (currentPosition < -(positionMetric * childTenNumbersMetric - 10)) {
        setInterval(intervalMetric.tenHours(), 36000000);
        return '0px';
      }
      const position = currentPosition - positionMetric;

      return position + 'px';
    });
  };

  /* ------- TEN MINUTES USE EFFECT ------ */

  intervalMetric.tenMinutes = () => {
    setTenMinutesPosition((prevPosition) => {
      const currentPosition = parseInt(prevPosition.slice(0, -2));
      if (currentPosition < -(positionMetric * childSixNumbersMetric - 10)) {
        setInterval(intervalMetric.hours(), 3600000);
        return '0px';
      }
      const position = currentPosition - positionMetric;

      return position + 'px';
    });
  };

  /* ------- UNIT MINUTES USE EFFECT ------ */

  intervalMetric.minutes = () => {
    setMinutesPosition((prevPosition) => {
      const currentPosition = parseInt(prevPosition.slice(0, -2));
      if (currentPosition < -(positionMetric * childTenNumbersMetric - 10)) {
        setInterval(intervalMetric.tenMinutes(), 600000);
        return '0px';
      }
      const position = currentPosition - positionMetric;

      return position + 'px';
    });
  };

  /* ------- TEN SECCONDS USE EFFECT ------ */

  intervalMetric.tenSeconds = () => {
    setTenSecondsPosition((prevPosition) => {
      const currentPosition = parseInt(prevPosition.slice(0, -2));
      if (currentPosition < -(positionMetric * childSixNumbersMetric - 10)) {
        setInterval(intervalMetric.minutes(), 60000);
        return '0px';
      }
      const position = currentPosition - positionMetric;
      return position + 'px';
    });
  };

  /* ------- UNIT SECCONDS USE EFFECT ------ */

  useEffect(() => {
    setInterval(() => {
      setSecondsPosition((prevPosition) => {
        const currentPosition = parseInt(prevPosition.slice(0, -2));
        if (currentPosition < -(positionMetric * childTenNumbersMetric - 10)) {
          setInterval(intervalMetric.tenSeconds(), 10000);
          return '0px';
        }
        const position = currentPosition - positionMetric;

        return position + 'px';
      });
    }, 1000);
  }, []);

  /* ================ LOAD PAGE DATA BLOCK CODE ============== */

  useEffect(() => {
    const updateTime = new Date();

    const currentTenHours = concatZero(updateTime.getHours());
    const currentHours = concatZero(updateTime.getHours());
    const currentTenMinutes = concatZero(updateTime.getMinutes());
    const currentMinutes = concatZero(updateTime.getMinutes());
    const currentTenSeconds = concatZero(updateTime.getSeconds());
    const currentSeconds = concatZero(updateTime.getSeconds());

    const sixNumbersOptions = [0, 1, 2, 3, 4, 5];
    const threeNumbersOptions = [0, 1, 2];
    const tenNumbersOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    sixNumbersOptions.forEach((numberOption) => {
      if (numberOption == currentTenMinutes.toString().slice(0, -1)) {
        setTenMinutesPosition(() => {
          return '-' + positionMetric * numberOption + 'px';
        });
      }

      if (numberOption == currentTenSeconds.toString().slice(0, -1)) {
        setTenSecondsPosition(() => {
          return '-' + positionMetric * numberOption + 'px';
        });
      }
    });

    threeNumbersOptions.forEach((numberOption) => {
      if (numberOption == currentTenHours.toString().slice(0, -1)) {
        setTenHoursPosition(() => {
          return '-' + positionMetric * numberOption + 'px';
        });
      }
    });

    tenNumbersOptions.forEach((numberOption) => {
      if (
        numberOption ==
        currentHours.toString()[currentHours.toString().length - 1]
      ) {
        setHoursPosition(() => {
          return '-' + positionMetric * numberOption + 'px';
        });
      }

      if (
        numberOption ==
        currentMinutes.toString()[currentMinutes.toString().length - 1]
      ) {
        setMinutesPosition(() => {
          return '-' + positionMetric * numberOption + 'px';
        });
      }

      if (
        numberOption ==
        currentSeconds.toString()[currentSeconds.toString().length - 1]
      ) {
        setSecondsPosition(() => {
          return '-' + positionMetric * numberOption + 'px';
        });
      }
    });
  }, []);

  /* ================= JSX HTML BLOCK CODE ============ */

  return (
    <>
      <section
        id="clock"
        style={{
          position: 'absolute',
          overflow: 'visible',
          zIndex: -10,
        }}
      >
        <article className="hours">
          <div
            id="tenHours"
            ref={tenHoursRef}
            className="clockBar reduced"
            style={{
              position: 'relative',
              top: tenHoursPosition,
              transition: transitionMetric,
              color: '#ffffff08',
              backgroundColor: '#43434300',
            }}
          >
            <span>0</span>
            <span>1</span>
            <span>2</span>
          </div>
          <div
            id="unitHour"
            className="clockBar"
            style={{
              position: 'relative',
              top: hoursPosition,
              transition: transitionMetric,
              color: '#ffffff08',
              backgroundColor: '#43434300',
            }}
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
        <article className="minutes">
          <div
            id="tenMinutes"
            ref={tenMinutesRef}
            className="clockBar reduced"
            style={{
              position: 'relative',
              top: tenMinutesPosition,
              transition: transitionMetric,
              color: '#ffffff08',
              backgroundColor: '#43434300',
            }}
          >
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <div
            id="unitMinutes"
            className="clockBar"
            style={{
              position: 'relative',
              top: minutesPosition,
              transition: transitionMetric,
              color: '#ffffff08',
              backgroundColor: '#43434300',
            }}
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
        <article className="seconds">
          <div
            id="tenSeconds"
            className="clockBar reduced"
            style={{
              position: 'relative',
              top: tenSecondsPosition,
              transition: transitionMetric,
              color: '#ffffff08',
              backgroundColor: '#43434300',
            }}
          >
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <div
            id="unitSeconds"
            ref={unitSecondsRef}
            className="clockBar"
            style={{
              position: 'relative',
              top: secondsPosition,
              transition: transitionMetric,
              color: '#ffffff08',
              backgroundColor: '#43434300',
            }}
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

      <section id="clock">
        <article className="hours">
          <div
            id="tenHours"
            ref={tenHoursRef}
            className="clockBar reduced"
            style={{
              position: 'relative',
              top: tenHoursPosition,
              transition: transitionMetric,
            }}
          >
            <span>0</span>
            <span>1</span>
            <span>2</span>
          </div>
          <div
            id="unitHour"
            className="clockBar"
            style={{
              position: 'relative',
              top: hoursPosition,
              transition: transitionMetric,
            }}
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
        <article className="minutes">
          <div
            id="tenMinutes"
            ref={tenMinutesRef}
            className="clockBar reduced"
            style={{
              position: 'relative',
              top: tenMinutesPosition,
              transition: transitionMetric,
            }}
          >
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <div
            id="unitMinutes"
            className="clockBar"
            style={{
              position: 'relative',
              top: minutesPosition,
              transition: transitionMetric,
            }}
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
        <article className="seconds">
          <div
            id="tenSeconds"
            className="clockBar reduced"
            style={{
              position: 'relative',
              top: tenSecondsPosition,
              transition: transitionMetric,
            }}
          >
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <div
            id="unitSeconds"
            ref={unitSecondsRef}
            className="clockBar"
            style={{
              position: 'relative',
              top: secondsPosition,
              transition: transitionMetric,
            }}
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

        <article id="colorPallete">
          <div className="buttonBackground">
            <Pallete /> 
          </div>
        </article>

        <article id="devInfo">
          <div className="buttonBackground">
            <a href="https://github.com/gregorioazevedo">
              <Github /> 
            </a>
          </div>
        </article>

      </section>
    </>
  );
};

export default App;
