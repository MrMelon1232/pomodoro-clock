import { useContext } from "react";
import { SettingsContext } from "./SettingsContext";

/**
 * Settings context
 *
 * A context to be used for all our user settings.
 *
 * @returns {{ context: context }}
 *
 * The settings context to be used
 */
export const useSettingsContext = () => {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error("useSettingsContext must be within a SettingsProvider");
    }

    return context;
};
