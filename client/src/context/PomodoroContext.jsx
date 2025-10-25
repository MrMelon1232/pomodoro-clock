import { createContext, useState } from "react";

// Pomodoro context to be shared between timer and task
const PomodoroContext = createContext();

// Pomororo provider
export const PomodoroProvider = ({ children }) => {
    // Define values and states to be shared
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);

    // Function to add a task
    const addTask = (title, requiredPomodoros = 1, notes) => {
        const newTask = {
            id: Date.now(),
            title,
            notes,
            requiredPomodoros,
            completedPomodoros: 0,
            done: false,
        };

        // Append to our previous state our new task
        setTasks((prev) => [...prev, newTask]);
    };

    // Function to remove tasks
    const removeTask = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    // Function to mark a completed pomodoro for a task
    const completePomodoroForTask = (taskId) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          completePomodoros: task.completePomodoros + 1,
                          done:
                              task.completePomodoros + 1 >=
                              task.requiredPomodoros,
                      }
                    : task
            )
        );
    };

    return (
        <PomodoroContext.Provider
            values={{
                tasks,
                addTask,
                removeTask,
                activeTask,
                setActiveTask,
                completePomodoroForTask,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    );
};
