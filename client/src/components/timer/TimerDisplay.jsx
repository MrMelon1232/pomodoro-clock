import { MODES } from "../../utils/timerUtils";
import { usePomodoro } from "../../hooks/usePomodoro";
import { MODE_STYLES } from "../../themes/modeStyles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { LuTimerReset } from "react-icons/lu";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { usePomodoroContext } from "../../context/usePomodoroContext";
import { useEffect } from "react";

export const TimerDisplay = (settings) => {
    // Get values from our pomodoro timer logic
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

    // Get custom styles from our mode styles
    const style = MODE_STYLES[mode];

    // Get values from our pomodoro context
    const { activeTask, completePomodoroForTask } = usePomodoroContext();

    // Use effect to be executed on timer completion
    useEffect(() => {
        // check if the timer has reached 0 and we are in work mode
        if (
            !isRunning &&
            formattedTime === "00:00" &&
            mode == MODES.WORK &&
            activeTask
        ) {
            completePomodoroForTask();
        }
    }, [isRunning, formattedTime, activeTask, mode, completePomodoroForTask]);

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

            {/* Active task info */}
            <div className="mt-6 text-center">
                {activeTask ? (
                    <div className="bg-espresso/60 rounded-xl px-5 py-3 shadow-inner max-w-sm mx-auto">
                        <p className="text-cream font-semibold text-lg">
                            {activeTask.title}
                        </p>
                        <p className="text-sand/70 text-sm mt-1">
                            {activeTask.completedPomodoros}/
                            {activeTask.requiredPomodoros} 🍅 done
                        </p>
                    </div>
                ) : (
                    <p className="text-sand/60 text-sm italic mt-2">
                        No active task — add one to start focusing 🍅
                    </p>
                )}
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
