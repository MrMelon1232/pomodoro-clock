import { useState, useEffect, useCallback } from "react";
import {
    MODES,
    formatTime,
    calculateProgress,
    getNextMode,
    getModeDuration,
} from "../utils/timerUtils";

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
export function usePomodoro(settings) {
    // States
    const [mode, setMode] = useState(MODES.WORK);
    const [cycleCount, setCycleCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(
        getModeDuration(MODES.WORK, settings)
    );
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

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

    // Handle transitions between modes after time runs out
    useEffect(() => {
        // Prevents auto switch if the timer is not running
        if (!isRunning && timeLeft === 0) return;

        // Stop the timer when it reaches 0
        if (timeLeft === 0) {
            // Update our mode, current cycle, and the time left
            const { nextMode, nextCycle, nextPomodoroCount } = getNextMode(
                mode,
                cycleCount,
                pomodoroCount
            );
            setMode(nextMode);
            setCycleCount(nextCycle);
            setPomodoroCount(nextPomodoroCount);
            setTimeLeft(getModeDuration(nextMode, settings));
        }
    }, [timeLeft, mode, cycleCount, pomodoroCount, settings, isRunning]);

    // Handlers
    const start = useCallback(() => setIsRunning(true), []);
    const stop = useCallback(() => setIsRunning(false), []);
    const reset = useCallback(() => {
        setIsRunning(false);
        setMode(MODES.WORK);
        setCycleCount(0);
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
    };
}
