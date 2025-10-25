import { MODES } from "../utils/timerUtils";
import { usePomodoro } from "../hooks/usePomodoro";
import { MODE_STYLES } from "../themes/modeStyles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SecondaryButton } from "../components/SecondaryButton";
import { LuTimerReset } from "react-icons/lu";
import { PrimaryButton } from "../components/PrimaryButton";

export const TimerDisplay = (settings) => {
    const {
        mode,
        formattedTime,
        isRunning,
        progress,
        start,
        stop,
        reset,
        changeMode,
    } = usePomodoro(settings);

    const style = MODE_STYLES[mode];

    return (
        <div className="flex flex-col justify-center items-center w-full py-6">
            {/* Mode change options */}
            <div className="grid grid-cols-3 gap-4 py-6">
                <SecondaryButton
                    label="Pomodoro"
                    onClick={() => changeMode(MODES.WORK)}
                    active={mode === MODES.WORK}
                />
                <SecondaryButton
                    label="Short Break"
                    onClick={() => changeMode(MODES.SHORT_BREAK)}
                    active={mode === MODES.SHORT_BREAK}
                />
                <SecondaryButton
                    label="Long Break"
                    onClick={() => changeMode(MODES.LONG_BREAK)}
                    active={mode === MODES.LONG_BREAK}
                />
            </div>

            {/* Circular Progression bar  */}
            <div className="w-56 sm:w-64 md:w-72 lg:w-1/2">
                <CircularProgressbar
                    value={progress}
                    text={formattedTime}
                    styles={buildStyles({
                        pathColor: style.color,
                        textColor: style.color,
                        trailColor: "#1f2937",
                        textSize: "16px",
                        strokeLinecap: "round",
                        pathTransitionDuration: 0.5,
                    })}
                ></CircularProgressbar>{" "}
            </div>

            {/* Start, Pause, Reset buttons */}
            <div className="flex justify-center items-center gap-4 mt-6">
                {!isRunning ? (
                    <PrimaryButton
                        label="Start"
                        color="terracotta"
                        onClick={start}
                    />
                ) : (
                    <PrimaryButton
                        color="terracotta"
                        label="Pause"
                        onClick={stop}
                    />
                )}

                <LuTimerReset className="size-10 " onClick={reset} />
            </div>
        </div>
    );
};
