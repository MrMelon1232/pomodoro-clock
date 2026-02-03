import "./App.css";
import { useState } from "react";
import { TimerDisplay } from "./components/timer/TimerDisplay";
import { TaskList } from "./components/tasks/TaskList";
import { Drawer } from "./components/common/Drawer";
import { DrawerButton } from "./components/ui/buttons/DrawerButton";
import { FiSettings } from "react-icons/fi";
import { Settings } from "./components/settings/Settings";
import { BackgroundRenderer } from "./components/layout/BackgroundRenderer";
import { BackgroundTrigger } from "./components/settings/BackgroundTrigger";

function App() {
    const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

    return (
        <div className="min-h-scren relative">
            <BackgroundRenderer />

            <div className="relative z-10 flex flex-col gap-6">
                <TimerDisplay />

                {/* Container task drawer, settings, background changes and sound changes */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Background, sound preferences */}
                    <BackgroundTrigger />

                    {/* Task drawer */}
                    <div className="flex justify-center">
                        <DrawerButton
                            label="Check your Tasks!"
                            onClick={() => setIsTaskDrawerOpen(true)}
                        />
                        <Drawer
                            isOpen={isTaskDrawerOpen}
                            onClose={() => setIsTaskDrawerOpen(false)}
                        >
                            <TaskList />
                        </Drawer>
                    </div>

                    {/* Settings */}
                    <div className="flex justify-center">
                        <FiSettings
                            size={24}
                            className="cursor-pointer"
                            onClick={() => setIsSettingsDrawerOpen(true)}
                        />
                        <Drawer
                            isOpen={isSettingsDrawerOpen}
                            onClose={() => setIsSettingsDrawerOpen(false)}
                        >
                            <Settings />
                        </Drawer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
