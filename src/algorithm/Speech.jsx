import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import { BiMicrophone } from "react-icons/bi";
import { BiMicrophoneOff } from "react-icons/bi";

const SpeechAssist = () => {
  const [message, setMessage] = useState("");
  let [tasks, setTask] = useState([]);
  const [turn, setTurn] = useState(false);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setTurn(true);
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setTurn(false);
  };

  const speechHandler = () => {
    if (turn) {
      stopListening();
    } else {
      startListening();
    }
  };

  const commands = [
    {
      command: "Add :task",
      callback: (task) => handleSave(task),
      matchInterim: true,
    },
    {
      command: "clear",
      callback: (task) => setTask([]),
      matchInterim: true,
    },
    {
      command: "Delete *",
      callback: (task) => handleDelete(task),
      matchInterim: true,
    },
    {
      command: ["hi", "hello", "hey"],
      callback: (command) =>
        console.log(`You just greeted with ${command} to the Algorithm 😄`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
    },
  ];

  const handleSave = (task) => {
    setMessage(task);
    if (tasks.includes(task)) return;
    setTask((prevTasks) => [...prevTasks, task]);
  };

  const handleDelete = (task) => {
    setMessage(task);
    tasks = tasks.filter((tsk) => task != tsk);
    setTask(tasks);
  };

  const { listening, browserSupportsSpeechRecognition } = useSpeechRecognition({
    commands,
  });

  if (!browserSupportsSpeechRecognition) return <h2>Switch to Chrome!</h2>;

  return (
    <div className="">
      <div className="flex mt-6 mx-5 gap-3 text-[20px]">
        <input
          type="text"
          defaultValue={message}
          className="border mr-2 w-full rounded-lg outline-none px-2 py-1"
        />
        <button
          className="px-4 py-2 rounded-full focus:outline-none
          bg-blue-800 font-semibold active:bg-blue-800"
          onClick={speechHandler}
        >
          {listening ? (
            <BiMicrophone className="bg-transparent" fontSize={20} />
          ) : (
            <BiMicrophoneOff className="bg-transparent" fontSize={20} />
          )}
        </button>
      </div>
      <div className="box mx-4 my-4 flex gap-2 justify-center flex-wrap">
        {tasks?.map((task, idx) => (
          <h2
            key={idx}
            className="border px-2 py-1 rounded-full font-mono inline bg-white text-black opacity-85"
          >
            {task}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default SpeechAssist;
