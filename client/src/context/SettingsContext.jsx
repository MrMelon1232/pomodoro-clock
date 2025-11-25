import { createContext, useCallback, useState } from "react";
import { MODES, DEFAULT_DURATIONS } from "../utils/timerUtils";

// eslint-disable-next-line react-refresh/only-export-components
export const SettingsContext = createContext();

// Backgrounds
const BACKGROUNDS = [
    {
        id: "solid-dark",
        type: "color",
        value: "#0f0f0f",
        label: "Dark",
    },
    {
        id: "solid-cream",
        type: "color",
        value: "#f4eadc",
        label: "Cream",
    },
    {
        id: "nyc",
        type: "image",
        src: "/assets/backgrounds/images/nyc.webp",
        srcMobile: "/assets/backgrounds/images/nyc-mobile.webp",
        label: "NYC",
    },
    {
        id: "hk",
        type: "image",
        src: "/assets/backgrounds/images/hk.webp",
        srcMobile: "/assets/backgrounds/images/hk-mobile.webp",
        label: "Hong Kong",
    },
    {
        id: "beach",
        type: "video",
        src: "/assets/backgrounds/videos/beach.mp4",
        srcMobile: "/assets/backgrounds/images/beach-mobile.webp",
        label: "Beach",
    },
    {
        id: "cozy",
        type: "video",
        src: "/assets/backgrounds/videos/cozy.mp4",
        srcMobile: "/assets/backgrounds/videos/cozy-mobile.mp4",
        label: "Cozy",
    },
    {
        id: "mountain",
        type: "video",
        src: "/assets/backgrounds/videos/mountain.mp4",
        srcMobile: "/assets/backgrounds/videos/mountain-mobile.mp4",
        label: "Mountain",
    },
    {
        id: "ocean",
        type: "video",
        src: "/assets/backgrounds/videos/ocean.mp4",
        srcMobile: "/assets/backgrounds/videos/ocean-mobile.mp4",
        label: "Ocean",
    },
    {
        id: "study",
        type: "video",
        src: "/assets/backgrounds/videos/study.mp4",
        srcMobile: "/assets/backgrounds/videos/study-mobile.mp4",
        label: "Study",
    },
    {
        id: "sunrise",
        type: "video",
        src: "/assets/backgrounds/videos/sunrise.mp4",
        srcMobile: "/assets/backgrounds/videos/sunrise-mobile.mp4",
        label: "Sunrise",
    },
];

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

    const [backgroundIndex, setBackgroundIndex] = useState(0);

    const nextBg = () => {
        setBackgroundIndex((i) => (i + 1) % BACKGROUNDS.length);
    };

    const prevBg = () => {
        setBackgroundIndex(
            (i) => (i - 1 + BACKGROUNDS.length) % BACKGROUNDS.length
        );
    };

    const updateSettings = useCallback((key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                settings,
                updateSettings,
                backgrounds: BACKGROUNDS,
                backgroundIndex,
                nextBg,
                prevBg,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
