import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PomodoroProvider } from "./context/PomodoroContext";
import { SettingsProvider } from "./context/SettingsContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SettingsProvider>
            <PomodoroProvider>
                <App />
            </PomodoroProvider>
        </SettingsProvider>
    </StrictMode>
);
