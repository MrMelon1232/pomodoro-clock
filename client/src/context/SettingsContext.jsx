import { createContext, useCallback, useState } from "react";
import { MODES, DEFAULT_DURATIONS } from "../utils/timerUtils";

// eslint-disable-next-line react-refresh/only-export-components
export const SettingsContext = createContext();

// Settings context and provider to be used by our timer component
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        workDuration: DEFAULT_DURATIONS[MODES.WORK],
        shortBreak: DEFAULT_DURATIONS[MODES.SHORT_BREAK],
        longBreak: DEFAULT_DURATIONS[MODES.LONG_BREAK],
        autoStart: false,
        theme: "dark",
        notifications: false,
        autoDeleteTask: false,
    });

    const updateSettings = useCallback((key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
