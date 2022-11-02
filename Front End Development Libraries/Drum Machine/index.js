const audioClips = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
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
  C: 67
}

const App = () => {
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(1);

  const playRecording = () => {
    let index = 0
    const recordArray = recording.split("");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      const audioButton = document.getElementById(key[recordArray[index]])
      audioButton.classList.add("btn-warning")
      console.log(audioButton)
      setTimeout(() => {
        audioButton.classList.remove("btn-warning")
      }, 1/speed * 300)
      console.log(audioButton)
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++
    }, 1/speed * 300);
    setTimeout(() => clearInterval(interval), 1/speed * 300 * recordArray.length)
  };

  const deleteLast = () => {
    setRecording(recording.slice(0, recording.length - 1))
  }

  return (
    <div id="drum-machine" className="d-flex justify-content-center align-items-center bg-dark min-vh-100 text-dark">
      <div id="display" className="w-50">
        <h1 className="text-center">Drum Machine</h1>
        <div className="d-flex justify-content-around flex-wrap">
          {audioClips.map((clip) => {
            return (
              <Pad
                key={clip.id}
                clip={clip}
                volume={volume}
                setRecording={setRecording}
              />
            );
          })}
        </div>
        <h2>Volume: {Math.round(Number(volume) * 100)}%</h2>
        <input
          type="range"
          onChange={(e) => setVolume(e.target.value)}
          value={volume}
          min="0"
          max="1"
          step="0.01"
        />
        <div>{recording}</div>
        {recording && (
          <>
            <button onClick={playRecording} className="btn btn-primary">
              Play
            </button>
            <button onClick={deleteLast} className="btn btn-danger"><i className="fa-solid fa-delete-left"></i></button>
            <button onClick={() => setRecording("")} className="btn btn-danger">
              Clear
            </button>
            <h2>Speed</h2>
            <input
            type="range"
            onChange={(e) => setSpeed(e.target.value)}
            value={speed}
            min="0.7"
            max="1.3"
            step="0.01"
            />
          </>
        )}
      </div>
    </div>
  );
};

const Pad = ({ clip, volume, setRecording }) => {
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
  };

  return (
    <div
      id={clip.keyCode}
      onClick={playSound}
      className={`btn btn-primary p-4 ${active && "btn-warning"} drum-pad`}
    >
      <audio id={clip.keyTrigger} className="clip" src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
