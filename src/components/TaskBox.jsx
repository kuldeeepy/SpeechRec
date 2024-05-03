import SpeechAssist from "../algorithm/Speech.jsx";

function TaskBox() {
  return (
    <div className="grid h-screen place-items-center px-3 max-sm:px-4 max-lg:px-[190px] max-xl:px-[350px] xl:px-[620px]">
      <div className="border-white border rounded-lg w-full">
        <SpeechAssist />
      </div>
    </div>
  );
}

export default TaskBox;
