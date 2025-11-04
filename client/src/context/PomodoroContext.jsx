import { createContext, useState, useCallback } from "react";

// Pomodoro context to be shared between timer and task
// eslint-disable-next-line react-refresh/only-export-components
export const PomodoroContext = createContext();

// Pomororo provider
export const PomodoroProvider = ({ children }) => {
    // Define values and states to be shared
    const [tasks, setTasks] = useState([]);
    const [activeTaskId, setActiveTaskId] = useState(null);
    const activeTask = tasks.find((t) => t.id === activeTaskId) || null;

    // Function to add a task
    const addTask = useCallback((title, requiredPomodoros = 1, notes) => {
        setTasks((prev) => {
            const newTask = {
                id: Date.now(),
                title,
                notes,
                requiredPomodoros,
                completedPomodoros: 0,
                done: false,
                order: prev.length + 1,
            };

            return [...prev, newTask];
        });
    }, []);

    // Function to remove tasks
    const removeTask = useCallback((taskId) => {
        setTasks((prev) => {
            // Filter out the task we want to remove
            const filtered = prev.filter((task) => task.id !== taskId);

            // Reorder our list of tasks
            return filtered.map((task, index) => ({
                ...task,
                order: index + 1,
            }));
        });
    }, []);

    // Function to mark a completed pomodoro for a task
    const completePomodoroForTask = useCallback(() => {
        if (!activeTaskId) return;

        setTasks((prev) =>
            prev.map((task) => {
                if (task.id !== activeTaskId) return task;

                // If already done, do not increment again
                if (task.done) return task;

                const newCount = task.completedPomodoros + 1;

                return {
                    ...task,
                    completedPomodoros: newCount,
                    done: newCount >= task.requiredPomodoros,
                };
            })
        );
    }, [activeTaskId]);

    // Function to manually set new active task
    const manuallySetActiveTask = useCallback(
        (taskId) => {
            if (activeTaskId === taskId) {
                setActiveTaskId(null);
            } else {
                setActiveTaskId(taskId);
            }
        },
        [activeTaskId]
    );

    // Function to reset all current tasks
    const resetTasks = useCallback(() => {
        setTasks([]);
        setActiveTaskId(null);
    }, []);

    // Function to edit tasks
    const editTask = useCallback((taskID, updates) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskID ? { ...task, ...updates } : task
            )
        );
    }, []);

    return (
        <PomodoroContext.Provider
            value={{
                tasks,
                addTask,
                removeTask,
                activeTask,
                setActiveTaskId: manuallySetActiveTask,
                completePomodoroForTask,
                resetTasks,
                editTask,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    );
};
