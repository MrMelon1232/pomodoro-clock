import { MODES } from "../utils/timerUtils";
import { usePomodoro } from "../hooks/usePomodoro";
import { MODE_STYLES } from "../themes/modeStyles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const TimerDisplay = (settings) => {
    const { mode, formattedTime, progress, start, stop, reset, changeMode } =
        usePomodoro(settings);

    const style = MODE_STYLES[mode];

    return (
        <div className="flex flex-col">
            {/* Mode change options */}
            <div className="">
                <button onClick={() => changeMode(MODES.WORK)}>Pomodoro</button>
                <button onClick={() => changeMode(MODES.SHORT_BREAK)}>
                    Shot Break
                </button>
                <button onClick={() => changeMode(MODES.LONG_BREAK)}>
                    Long Break
                </button>
            </div>

            {/* Circular Progression bar  */}
            <div className="">
                <CircularProgressbar
                    value={progress}
                    text={formattedTime}
                    styles={buildStyles({
                        pathColor: style.color,
                        textColor: style.color,
                        trailColor: "#1f2937",
                    })}
                ></CircularProgressbar>{" "}
            </div>

            {/* Start, Pause, Reset buttons */}
            <div className="">
                <button onClick={start}>Start</button>
                <button onClick={stop}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};
