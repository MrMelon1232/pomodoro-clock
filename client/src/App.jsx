import "./App.css";
import { TimerDisplay } from "./components/timer/TimerDisplay";
import { TaskList } from "./components/tasks/TaskList";
import { Drawer } from "./components/common/Drawer";
import { DrawerButton } from "./components/buttons/DrawerButton";
import { useState } from "react";

function App() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div>
            <TimerDisplay />

            <DrawerButton onClick={() => setIsDrawerOpen(true)} />
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <TaskList />
            </Drawer>
        </div>
    );
}

export default App;
