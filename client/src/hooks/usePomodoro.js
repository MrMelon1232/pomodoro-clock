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
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(
        getModeDuration(MODES.WORK, settings)
    );
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

    // Handle transitions after timer hits 0
    useEffect(() => {
        // Only act when timer finishes
        if (timeLeft !== 0) return;

        // Stop running timer
        setIsRunning(false);

        // Update counters based on finished mode
        if (mode === MODES.WORK) {
            setPomodoroCount((prev) => prev + 1);
        } else if (mode === MODES.LONG_BREAK) {
            setCycleCount((prev) => prev + 1);
        }

        // Determine next mode *after* counts are updated
        setMode((prevMode) => {
            const nextMode = getNextMode(
                prevMode,
                pomodoroCount + (mode === MODES.WORK ? 1 : 0)
            );
            setTimeLeft(getModeDuration(nextMode, settings));
            return nextMode;
        });
    }, [timeLeft, mode, pomodoroCount, settings]);

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
