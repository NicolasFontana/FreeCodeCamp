const audioClips = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://raw.githubusercontent.com/nadktk/fcc_nadktk/master/drum-machine/sounds/drums/drums1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://raw.githubusercontent.com/nadktk/fcc_nadktk/master/drum-machine/sounds/drums/drums2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://raw.githubusercontent.com/nadktk/fcc_nadktk/master/drum-machine/sounds/drums/drums3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://raw.githubusercontent.com/nadktk/fcc_nadktk/master/drum-machine/sounds/drums/drums4.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://raw.githubusercontent.com/nadktk/fcc_nadktk/master/drum-machine/sounds/drums/drums5.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://raw.githubusercontent.com/nadktk/fcc_nadktk/master/drum-machine/sounds/drums/drums6.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://raw.githubusercontent.com/nadktk/fcc_nadktk/master/drum-machine/sounds/drums/drums7.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://raw.githubusercontent.com/nadktk/fcc_nadktk/master/drum-machine/sounds/drums/drums8.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://raw.githubusercontent.com/nadktk/fcc_nadktk/master/drum-machine/sounds/drums/drums9.mp3",
  },
];

const key = {
  Q: 81,
  W: 87,
  E: 69,
  A: 65,
  S: 83,
  D: 68,
  Z: 90,
  X: 88,
  C: 67,
};

const App = () => {
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(1);
  const [keyPressed, setKeyPressed] = React.useState("");

  const playRecording = () => {
    let index = 0;
    const recordArray = recording.split("");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      const audioButton = document.getElementById(key[recordArray[index]]);
      audioButton.classList.add("drum-active");
      setTimeout(() => {
        audioButton.classList.remove("drum-active");
      }, (1 / speed) * 300);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, (1 / speed) * 300);
    setTimeout(
      () => clearInterval(interval),
      (1 / speed) * 300 * recordArray.length
    );
  };

  const deleteLast = () => {
    setRecording(recording.slice(0, recording.length - 1));
  };

  React.useEffect(() => {
    if(recording == "") {
      setKeyPressed("")
    }
  }, [recording])

  return (
    <div id="drum-machine" className="bg-dark">
      <h1 className="text-white">Drum Machine</h1>
      <div className="containerMachine">
        <div id="display">
          <h2>{keyPressed ? keyPressed : "let's play"}</h2>
        </div>
        <div className="pad">
          <div className="volumeContainer">
            <p className="volume">
              Volume: {Math.round(Number(volume) * 100)}%
            </p>
            <input
              type="range"
              className="range"
              onChange={(e) => setVolume(e.target.value)}
              value={volume}
              min="0"
              max="1"
              step="0.01"
            />
          </div>
          <hr />
          <div className="buttonsContainer">
            {audioClips.map((clip) => {
              return (
                <Pad
                  key={clip.id}
                  clip={clip}
                  volume={volume}
                  setRecording={setRecording}
                  setKeyPressed={setKeyPressed}
                />
              );
            })}
          </div>
          {recording && <hr />}
          <div className="recording">{recording}</div>
          {recording && (
            <>
              <div className="controlsContainer">
                <div className="buttonControlContainer">
                  <div className="buttonBorder">
                    <button onClick={playRecording}>Play</button>
                  </div>
                </div>
                <div className="buttonControlContainer">
                  <div className="buttonBorder">
                    <button onClick={deleteLast}>
                      <i className="fa-solid fa-delete-left"></i>
                    </button>
                  </div>
                </div>
                <div className="buttonControlContainer">
                  <div className="buttonBorder">
                    <button
                      onClick={() => {
                        setRecording("");
                        setKeyPressed("");
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
              <div className="speedContainer">
                <p className="txtSpeed">Speed</p>
                <input
                  type="range"
                  className="range"
                  onChange={(e) => setSpeed(e.target.value)}
                  value={speed}
                  min="0.7"
                  max="1.3"
                  step="0.01"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <footer>
        <p>Created by Nicolas Fontana</p>
      </footer>
    </div>
  );
};

const Pad = ({ clip, volume, setRecording, setKeyPressed }) => {
  const [active, setActive] = React.useState(false);

  const handleKeyPress = (e) => {
    if (e.keyCode == clip.keyCode) {
      playSound();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 250);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording((prev) => prev + clip.keyTrigger);
    setKeyPressed(clip.keyTrigger);
  };

  return (
    <div className="buttonContainer">
      <div className="buttonBorder">
        <div
          id={clip.keyCode}
          onClick={playSound}
          className={`${active && "drum-active"} drum-pad`}
        >
          <audio id={clip.keyTrigger} className="clip" src={clip.url} />
          {clip.keyTrigger}
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
