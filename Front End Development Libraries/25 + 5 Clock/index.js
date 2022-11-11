const App = () => {
  const [recess, setRecess] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [play, setPlay] = React.useState(false);
  const [timingType, setTimingType] = React.useState("SESSION");
  const [timeLeft, setTimeLeft] = React.useState(1500);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const recessDecrement = () => {
    if (recess > 1) {
      setRecess((prev) => prev - 1);
    }
  };

  const recessIncrement = () => {
    if (recess < 60) {
      setRecess((prev) => prev + 1);
    }
  };

  const sessionDecrement = () => {
    if (session > 1) {
      setSession((prev) => prev - 1);
    }
  };

  const sessionIncrement = () => {
    if (session < 60) {
      setSession((prev) => prev + 1);
    }
  };

  function changeSessionTimeLeft() {
    if (timingType === "SESSION") {
      setTimeLeft(session * 60);
    }
  }

  React.useEffect(() => {
    changeSessionTimeLeft();
  }, [session]);

  function changeRecessTimeLeft() {
    if (timingType === "BREAK") {
      setTimeLeft(recess * 60);
    }
  }

  React.useEffect(() => {
    changeRecessTimeLeft();
  }, [recess]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const changeTimer = () => {
    const alarm = document.getElementById("beep")
    if (!timeLeft && timingType === "SESSION") {
        setTimeLeft(recess * 60);
        setTimingType("BREAK");
        alarm.play()
    }
    if (!timeLeft && timingType === "BREAK") {
        setTimeLeft(session * 60);
        setTimingType("SESSION");
        alarm.pause();
        alarm.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      timeout;
      changeTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  React.useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setRecess(5);
    setSession(25);
    setTimingType("SESSION");
    const alarm = document.getElementById("beep")
    alarm.pause();
    alarm.currentTime = 0;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div className="container-fluid bg-dark min-vh-100 text-white">
      <div className="col-12 col-md-8 offset-md-2">
        <div className="row">
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
              onClick={play ? null : recessDecrement}
            >
              -
            </button>
            <span id="break-length">{recess}</span>
            <button
              id="break-increment"
              className="btn btn-primary ms-3"
              onClick={play ? null : recessIncrement}
            >
              +
            </button>
          </div>
          <div className="col-6 col-md-5 col-lg-4">
            <button
              id="session-decrement"
              className="btn btn-primary me-3"
              onClick={play ? null : sessionDecrement}
            >
              -
            </button>
            <span id="session-length">{session}</span>
            <button
              id="session-increment"
              className="btn btn-primary ms-3"
              onClick={play ? null : sessionIncrement}
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
                {formatTime()}
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-4 text-center">
          <div className="col-12">
            <div id="start_stop" className="mx-2 d-inline-block pe-auto">
              <button className="btn btn-primary" onClick={handlePlay}>
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
