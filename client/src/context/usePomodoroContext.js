import { useContext } from "react";
import { PomodoroContext } from "./PomodoroContext";

/**
 * Pomodoro context
 *
 * A context to be used by our timer and our task components.
 *
 * @returns {{ context: context }}
 *
 * The pomodoro context to be used
 */
export const usePomodoroContext = () => {
    const context = useContext(PomodoroContext);

    if (!context) {
        throw new Error("usePomodoroContext must be within a PomodoroProvider");
    }

    return context;
};
