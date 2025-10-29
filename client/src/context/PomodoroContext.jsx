import { createContext, useState, useCallback } from "react";

// Pomodoro context to be shared between timer and task
// eslint-disable-next-line react-refresh/only-export-components
export const PomodoroContext = createContext();

// Pomororo provider
export const PomodoroProvider = ({ children }) => {
    // Define values and states to be shared
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);

    // Function to add a task
    const addTask = useCallback(
        (title, requiredPomodoros = 1, notes) => {
            const newTask = {
                id: Date.now(),
                title,
                notes,
                requiredPomodoros,
                completedPomodoros: 0,
                done: false,
                order: tasks.length + 1,
            };

            // Append to our previous state our new task
            setTasks((prev) => [...prev, newTask]);
        },
        [tasks]
    );

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
        // Exit if we have no active task
        if (!activeTask) return;

        setTasks((prev) => {
            const updatedTasks = prev.map((task) =>
                task.id === activeTask.id
                    ? {
                          ...task,
                          completedPomodoros: task.completedPomodoros + 1,
                          done:
                              task.completedPomodoros + 1 >=
                              task.requiredPomodoros,
                      }
                    : task
            );

            // Find the updated active task
            const updatedActiveTask = updatedTasks.find(
                (task) => task.id === activeTask.id
            );

            // Find if we need to queue a new tasks as our active
            if (updatedActiveTask?.done) {
                const newTask = updatedTasks.find(
                    (task) => task.order > activeTask.order && !task.done
                );
                setActiveTask(newTask || null);
            } else {
                setActiveTask(updatedActiveTask);
            }

            return updatedTasks;
        });
    }, [activeTask]);

    // Function to manually set new active task
    const manuallySetActiveTask = useCallback(
        (taskId) => {
            const task = tasks.find((task) => task.id === taskId);

            // Uncheck and remove active task
            if (activeTask && activeTask.id == task.id) {
                setActiveTask(null);
            }
            // Mark task as active
            else {
                setActiveTask(task);
            }
        },
        [tasks, activeTask]
    );

    // Function to reset all current tasks
    const resetTasks = useCallback(() => {
        setTasks([]);
        setActiveTask(null);
    }, []);

    // Function to edit tasks
    const editTask = useCallback(
        (taskID, updates) => {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskID ? { ...task, ...updates } : task
                )
            );

            // Keep our active task state updated if its been changed
            if (activeTask?.id === taskID) {
                setActiveTask((prev) => ({ ...prev, ...updates }));
            }
        },
        [activeTask]
    );

    return (
        <PomodoroContext.Provider
            value={{
                tasks,
                addTask,
                removeTask,
                activeTask,
                setActiveTask: manuallySetActiveTask,
                completePomodoroForTask,
                resetTasks,
                editTask,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    );
};
