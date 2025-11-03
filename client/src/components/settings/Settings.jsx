import { useSettingsContext } from "../../context/useSettingsContext";
import { DurationInput } from "../buttons/DurationStepperButton";
import { ToggleButton } from "../buttons/ToggleButton";

export const Settings = () => {
    // Get states and functions from settings context
    const { settings, updateSettings } = useSettingsContext();

    return (
        <div className="flex flex-col gap-4 px-2 items-start">
            {/* Timer settings */}
            <div className="flex flex-row gap-1 justify-center p-1 rounded-xl bg-stone-800 space-y-3 border border-stone-700">
                <h3 className="font-semibold text-lg">Timer Settings</h3>

                <DurationInput
                    label="Pomodoro"
                    value={settings.WORK / 60}
                    onChange={(v) => updateSettings("WORK", v * 60)}
                />
                <DurationInput
                    label="Short Break"
                    value={settings.SHORT_BREAK / 60}
                    onChange={(v) => updateSettings("SHORT_BREAK", v * 60)}
                />
                <DurationInput
                    label="Long Break"
                    value={settings.LONG_BREAK / 60}
                    onChange={(v) => updateSettings("LONG_BREAK", v * 60)}
                />

                <DurationInput
                    label="Pomodoros before long break"
                    value={settings.longBreakInterval}
                    onChange={(v) => updateSettings("longBreakInterval", v)}
                />
            </div>

            {/* Auto Start Pomodoro setting */}
            <div className="flex flex-row justify-between w-full items-center">
                <span>Auto Start Pomodoro</span>
                <ToggleButton
                    enabled={settings.autoStartPomodoro}
                    onChange={(v) => updateSettings("autoStartPomodoro", v)}
                />
            </div>

            {/* Auto Start Break setting */}
            <div className="flex flex-row justify-between w-full items-center">
                <span>Auto Start Break</span>
                <ToggleButton
                    enabled={settings.autoStartBreak}
                    onChange={(v) => updateSettings("autoStartBreak", v)}
                />
            </div>

            {/* Auto Next Task setting */}
            <div className="flex flex-row justify-between w-full items-center">
                <span>Auto Switch Next Task</span>
                <ToggleButton
                    enabled={settings.autoNextTask}
                    onChange={(v) => updateSettings("autoNextTask", v)}
                />
            </div>

            {/* Auto delete task setting */}
            <div className="flex flex-row justify-between w-full items-center">
                <span>Auto Delete Task</span>
                <ToggleButton
                    enabled={settings.autoDeleteTask}
                    onChange={(v) => updateSettings("autoDeleteTask", v)}
                />
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-sand/30 my-2" />

            {/* Auto delete task setting */}
            <div className="flex flex-row justify-between w-full items-center">
                <span>Auto Delete Task</span>
                <ToggleButton
                    enabled={settings.autoDeleteTask}
                    onChange={(v) => updateSettings("autoDeleteTask", v)}
                />
            </div>

            {/* Sound settings */}
            <div className="flex flex-row justify-between w-full items-center">
                <span>Sound Enabled</span>
                <ToggleButton
                    enabled={settings.soundOn}
                    onChange={(v) => updateSettings("soundOn", v)}
                />
            </div>

            {/* Sound Level setting */}
            <div className="flex flex-row justify-between w-full items-center">
                <DurationInput
                    label="Sound Level"
                    value={settings.soundLevel}
                    onChange={(v) => updateSettings("soundLevel", v)}
                />
            </div>

            {/* Ticking Sound setting */}
            <div className="flex flex-row justify-between w-full items-center">
                <span>Ticking Sound</span>
                <ToggleButton
                    enabled={settings.tickingSound}
                    onChange={(v) => updateSettings("tickingSound", v)}
                />
            </div>

            {/* Vibration setting */}
            <div className="flex flex-row justify-between w-full items-center">
                <span>Vibration</span>
                <ToggleButton
                    enabled={settings.vibration}
                    onChange={(v) => updateSettings("vibration", v)}
                />
            </div>

            {/* Notifications setting */}
            <div className="flex flex-row justify-between w-full items-center">
                <span>Notifications</span>
                <ToggleButton
                    enabled={settings.notifications}
                    onChange={(v) => updateSettings("notifications", v)}
                />
            </div>
        </div>
    );
};
