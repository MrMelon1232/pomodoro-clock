import { useState, useEffect } from "react";
import {
    Modes,
    formatTime,
    calculateProgress,
    getNextMode,
    getModeDuration,
} from "../utils/timerUtils.js";
/**
 * Pomodoro timer logic hook.
 *
 * Manages timer countdown, mode transitions, and progress tracking.
 *
 * @param {object} settings - User settings containing durations for each mode (in seconds).
 * @returns {{
 *   mode: string,
 *   timeLeft: number,
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
    const [mode, setMode] = useState(Modes.WORK);
    const [cycleCount, setCycleCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(
        getModeDuration(Modes.WORK, settings)
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

    // Handle transitions between modes after time runs out
    useEffect(() => {
        // Prevents auto switch if the timer is not running
        if (!isRunning && timeLeft === 0) return;

        // Stop the timer when it reaches 0
        if (timeLeft === 0) {
            // Update our mode, current cycle, and the time left
            const { nextMode, nextCycle } = getNextMode(mode, cycleCount);
            setMode(nextMode);
            setCycleCount(nextCycle);
            setTimeLeft(getModeDuration(nextMode, settings));
        }
    }, [timeLeft, mode, cycleCount, settings, isRunning]);

    // Handlers
    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setMode(Modes.WORK);
        setCycleCount(0);
        setTimeLeft(getModeDuration(Modes.WORK, settings));
    };

    // Change mode
    const changeMode = (newMode) => {
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(getModeDuration(newMode, settings));
    };

    // Derived values
    const formattedTime = formatTime(timeLeft);
    const progress = calculateProgress(
        timeLeft,
        getModeDuration(mode, settings)
    );

    // Return everything for the UI
    return {
        mode,
        timeLeft,
        formattedTime,
        isRunning,
        progress,
        start,
        stop,
        reset,
        changeMode,
    };
}
