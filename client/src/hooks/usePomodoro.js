import { useState, useEffect, useCallback, useRef } from "react";
import {
    MODES,
    formatTime,
    calculateProgress,
    getNextMode,
    getModeDuration,
} from "../utils/timerUtils";
import { usePomodoroContext } from "../context/usePomodoroContext";
import { useSettingsContext } from "../context/useSettingsContext";

/**
 * Pomodoro timer logic hook.
 *
 * Manages timer countdown, mode transitions, and progress tracking.
 *
 * @param {object} settings - User settings containing durations for each mode (in seconds).
 * @returns {{
 *   mode: string,
 *   formattedTime: string,
 *   isRunning: boolean,
 *   progress: number,
 *   start: function,
 *   stop: function,
 *   reset: function,
 *   changeMode: function
 * }} Object containing the current timer state and control functions.
 */
export function usePomodoro() {
    // Retrieve settings and completedPomodoroForTask function from contexts
    const { settings } = useSettingsContext();
    const {
        tasks,
        removeTask,
        activeTask,
        setActiveTaskId,
        completePomodoroForTask,
    } = usePomodoroContext();

    // States
    const [mode, setMode] = useState(MODES.WORK);
    const [cycleCount, setCycleCount] = useState(0);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(
        getModeDuration(MODES.WORK, settings)
    );
    const [isRunning, setIsRunning] = useState(false);

    // Use effect to refresh time left on settings change
    useEffect(() => {
        if (!isRunning) {
            setTimeLeft(getModeDuration(mode, settings));
        }
    }, [settings, mode, isRunning]);

    // Use effect to decrement our timer after start
    useEffect(() => {
        // Exit if our timer is not running
        if (!isRunning) return;

        // Set our timer to decrement
        const interval = setInterval(() => {
            setTimeLeft((t) => Math.max(t - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    // Handle use ref to update on change of the function
    const onWorkCompleteRef = useRef(completePomodoroForTask);
    useEffect(() => {
        onWorkCompleteRef.current = completePomodoroForTask;
    }, [completePomodoroForTask]);

    // Handle transitions after timer hits 0
    useEffect(() => {
        if (timeLeft !== 0) return;

        setIsRunning(false);

        // Handle completion of work period
        if (mode === MODES.WORK) {
            // handle pomodoro increment count
            setPomodoroCount((prev) => prev + 1);
            onWorkCompleteRef.current?.();
        }

        // Handle completion of break period
        else if (mode === MODES.LONG_BREAK) {
            setCycleCount((prev) => prev + 1);
        }

        // Get the next mode based on the current one
        const nextMode = getNextMode(
            mode,
            pomodoroCount + (mode === MODES.WORK ? 1 : 0),
            settings.longBreakInterval
        );

        // Set Next mode and time left
        setMode(nextMode);
        setTimeLeft(getModeDuration(nextMode, settings));

        // Check auto start rule for pomodoros
        if (nextMode === MODES.WORK && settings.autoStartPomodoro) {
            setIsRunning(true);
        }

        // Check auto start for breaks
        if (
            (nextMode === MODES.LONG_BREAK || nextMode === MODES.SHORT_BREAK) &&
            settings.autoStartBreak
        ) {
            setIsRunning(true);
        }
    }, [timeLeft, mode, pomodoroCount, settings]);

    // Use effect to handle task completion or changes
    useEffect(() => {
        if (!activeTask) return;

        if (activeTask.done) {
            // auto delete completed task
            if (settings.autoDeleteTask) {
                removeTask(activeTask.id);
            }

            // auto switch next task
            if (settings.autoNextTask) {
                let nextTask =
                    tasks.find((t) => t.order < activeTask.order && !t.done) || // fallback to earlier tasks
                    tasks.find((t) => t.order > activeTask.order && !t.done) || // try forward
                    null;

                setActiveTaskId(nextTask?.id || null);
            }
        }
    }, [
        activeTask,
        settings.autoDeleteTask,
        settings.autoNextTask,
        tasks,
        removeTask,
        setActiveTaskId,
    ]);

    // Handlers
    const start = useCallback(() => setIsRunning(true), []);
    const stop = useCallback(() => setIsRunning(false), []);
    const reset = useCallback(() => {
        setIsRunning(false);
        setMode(MODES.WORK);
        setCycleCount(0);
        // Uncomment if we also want to reset our pomodoro count
        //setPomodoroCount(0);
        setTimeLeft(getModeDuration(MODES.WORK, settings));
    }, [settings]);

    // Change mode
    const changeMode = useCallback(
        (newMode) => {
            setIsRunning(false);
            setMode(newMode);
            setTimeLeft(getModeDuration(newMode, settings));
        },
        [settings]
    );

    // Derived values
    const formattedTime = formatTime(timeLeft);
    const progress = calculateProgress(
        timeLeft,
        getModeDuration(mode, settings)
    );

    // Return everything for the UI
    return {
        mode,
        formattedTime,
        isRunning,
        progress,
        start,
        stop,
        reset,
        changeMode,
        pomodoroCount,
        cycleCount,
    };
}
