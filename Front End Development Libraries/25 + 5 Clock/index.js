const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [play, setPlay] = React.useState(false);
  const [timingType, setTimingtype] = React.useState("SESSION");
  const [timeLeft, setTimeLeft] = React.useState(1500);

  const timeout = setTimeout(() => {
    if (play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (timingType === "SESSION") {
      setTimeout(() => {
        setTimingtype("BREAK");
        setTimeLeft(breakLength * 60);
        audio.currentTime = 0;
        audio.play();
      }, 1000)
    }
    if (timingType === "BREAK") {
      setTimeout(() => {
        setTimingtype("SESSION");
        setTimeLeft(sessionLength * 60);
        audio.currentTime = 0;
        audio.play();
      }, 1000)
    }
  };

  const clock = () => {
    if (play) {
      timeout;
      if (timeLeft == 0) {
        resetTimer();
      }
    } else {
      clearTimeout(timeout);
    }
  };

  React.useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div className="container-fluid bg-dark min-vh-100 text-white">
      <div className="col-12 col-md-8 offset-md-2">
        <div className="row py-5">
          <h1 className="col text-center my-4">25 + 5 Clock</h1>
        </div>
        <div className="row text-center mt-4">
          <p id="break-label" className="col-6 col-md-5 offset-md-1 col-lg-4 offset-lg-2 fs-5">
            Break Length
          </p>
          <p id="session-label" className="col-6 col-md-5 col-lg-4 fs-5">
            Session Length
          </p>
        </div>
        <div className="row text-center">
          <div className="col-6 col-md-5 offset-md-1 col-lg-4 offset-lg-2">
            <button
              id="break-decrement"
              className="btn btn-primary me-3"
              onClick={play ? null : handleBreakDecrease}
            >
              -
            </button>
            <span id="break-length">{breakLength}</span>
            <button
              id="break-increment"
              className="btn btn-primary ms-3"
              onClick={play ? null : handleBreakIncrease}
            >
              +
            </button>
          </div>
          <div className="col-6 col-md-5 col-lg-4">
            <button
              id="session-decrement"
              className="btn btn-primary me-3"
              onClick={play ? null : handleSessionDecrease}
            >
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button
              id="session-increment"
              className="btn btn-primary ms-3"
              onClick={play ? null : handleSessionIncrease}
            >
              +
            </button>
          </div>
        </div>
        <div className="row mt-5 text-center">
          <div className="col-12">
            <div
              id="containerDisplay"
              className="d-inline-block p-3 border border-white rounded"
            >
              <p id="timer-label" className="fs-3">
                {title}
              </p>
              <span id="time-left" className="fs-2">
                {timeFormatter()}
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-4 text-center">
          <div className="col-12">
            <div className="mx-2 d-inline-block pe-auto">
              <button id="start_stop" className="btn btn-primary" onClick={handlePlay}>
                <i className="fa-solid fa-play mx-1"></i>
                <i className="fa-solid fa-pause mx-1"></i>
              </button>
            </div>
            <button id="reset" className="btn btn-primary ms-3" onClick={handleReset}>
              <i className="fa-solid fa-rotate mx-2 pe-auto"></i>
            </button>
          </div>
        </div>
        <div className="row mt-5 text-center text-muted">
          <p>Created by Nicolas Fontana</p>
        </div>
      </div>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
