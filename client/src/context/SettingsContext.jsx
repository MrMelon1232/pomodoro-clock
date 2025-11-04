import { createContext, useCallback, useState } from "react";
import { MODES, DEFAULT_DURATIONS } from "../utils/timerUtils";

// eslint-disable-next-line react-refresh/only-export-components
export const SettingsContext = createContext();

// Settings context and provider to be used by our timer component
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        WORK: DEFAULT_DURATIONS[MODES.WORK],
        SHORT_BREAK: DEFAULT_DURATIONS[MODES.SHORT_BREAK],
        LONG_BREAK: DEFAULT_DURATIONS[MODES.LONG_BREAK],
        longBreakInterval: 4,
        autoStartPomodoro: false,
        autoStartBreak: false,
        autoNextTask: false,
        autoDeleteTask: false,
        soundOn: false,
        soundLevel: 50,
        notifications: false,
        tickingSound: false,
        vibration: false,
        theme: "dark",
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
