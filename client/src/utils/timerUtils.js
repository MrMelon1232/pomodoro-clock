/**
 * Time utilies
 * ----------------
 * Provides timer functionalities for our Pomodoro clock
 *
 * Enums:
 *  - Modes .............................. enum for all existing modes
 *  - Default_Durations .................. enum for default durations for each mode
 *
 * Functions:
 *  - formatTime ........................ formats seconds to "MM:SS"
 *  - calculateProgress .................. calculates the progress of our timer as a percentage
 *  - getNextMode ......................... gets the next mode based on the current mode
 *  - getModeDuration ..................... calculates the duration of the given mode based on user settings
 */

// Enum for all existing modes
export const Modes = {
    WORK: "WORK",
    SHORT_BREAK: "SHORT_BREAK",
    LONG_BREAK: "LONG_BREAK",
};

// Enum for default time for each mode
export const DEFAULT_DURATIONS = {
    [Modes.WORK]: 25 * 60,
    [Modes.SHORT_BREAK]: 5 * 60,
    [Modes.LONG_BREAK]: 15 * 60,
};

/**
 * Formats total seconds to "MM:SS" format
 *
 * @param {number} totalSeconds - Total time in seconds.
 *
 * @returns {string} Time format in "MM:SS".
 */
export function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}`;
}

/**
 * Calculates the progress of our timer as a percentage
 *
 * @param {number} timeLeft - Time left in seconds.
 * @param {number} totalDuration - Total duration of the timer in seconds.
 *
 * @returns {number} Percentage completion of the current timer.
 */
export function calculateProgress(timeLeft, totalDuration) {
    return ((totalDuration - timeLeft) / totalDuration) * 100;
}

/**
 * Get the next mode based on the current mode and cycle count.
 *
 * @param {string} currentMode - Current mode.
 * @param {number} cycleCount - Number of completed work sessions.
 * @returns {{ nextMode: string, nextCycle: number }} Object containing next mode and updated cycle count.
 */
export function getNextMode(currentMode, cycleCount) {
    if (currentMode === Modes.WORK) {
        const nextCycle = cycleCount + 1;
        const nextMode =
            nextCycle % 4 === 0 ? Modes.LONG_BREAK : Modes.SHORT_BREAK;
        return { nextMode, nextCycle };
    } else {
        return { nextMode: Modes.WORK, nextCycle: cycleCount };
    }
}

/**
 * Calculate the duration of the given mode based on user settings
 *
 * @param {number} mode - Current mode in our pomodoro timer.
 * @param {object} settings - User settings containing durations for each mode.
 *
 * @returns {number} Duration of the current mode in seconds.
 */
export function getModeDuration(mode, settings) {
    return settings?.[mode] ?? DEFAULT_DURATIONS[mode];
}
