import Loading from "./LoadSpinner";
import { MdRecordVoiceOver } from "react-icons/md";
import { useEffect, useState } from "react";
import { postWords } from "../firebase/postDataToFireStore";

const Toolbar = ({ x, y, apiData, userId }) => {
  const [saveWord, setSaveWord] = useState({});
  const [playing, setPlaying] = useState(false);

  const player = apiData.pron_us ? new Audio(apiData.pron_us) : false;

  useEffect(() => {
    if (player) {
      playing ? player.play() : player.pause();
      return setPlaying(false);
    }
  }, [playing]);

  const togglePlay = () => {
    setPlaying(true);
  };

  const handleSave = () => {
    if (!apiData) return;
    postWords(apiData, userId);
  };

  return (
    <div id="toolbar" className="container">
      <div
        className="absolute newWordPopUpBox border-2 bg-white h-[7em]  w-[30em] overflow-y-auto rounded-xl z-50"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        <button className="font-bold pt-2 px-2" onClick={togglePlay}>
          {playing ? (
            <div className="text-gray-200">
              <MdRecordVoiceOver />
            </div>
          ) : (
            <div>
              <MdRecordVoiceOver />
            </div>
          )}
        </button>
        <button className="font-bold pt-2 px-2" onClick={handleSave}>
          Save
        </button>
        <div className="p-3"> {apiData.def ? apiData.def : <Loading />}</div>
      </div>
    </div>
  );
};

export { Toolbar };
