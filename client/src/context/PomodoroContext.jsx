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
            order: tasks.length + 1,
        };

        // Append to our previous state our new task
        setTasks((prev) => [...prev, newTask]);
    };

    // Function to remove tasks
    const removeTask = (taskId) => {
        setTasks((prev) => {
            // Filter out the task we want to remove
            const filtered = prev.filter((task) => task.id !== taskId);

            // Reorder our list of tasks
            return filtered.map((task, index) => ({
                ...task,
                order: index + 1,
            }));
        });
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

        // queue the next tasks as active if the current one is completed
        const updated = tasks.find((t) => t.id == activeTask.id);
        if (activeTask && updated.done) queueNextTask();
    };

    // Function to determine the next tasks based on order
    const queueNextTask = () => {
        setActiveTask((prev) => {
            if (!prev) return null;

            // Check if the next tasks based on order exists in our list of tasks
            const nextTask = tasks.find(
                (t) => t.order > prev.order + 1 && !t.done
            );
            return nextTask || null;
        });
    };

    const manuallySetActiveTask = (taskId) => {
        const task = tasks.find((t) => t.id === taskId);
        if (task) setActiveTask(task);
    };

    return (
        <PomodoroContext.Provider
            values={{
                tasks,
                addTask,
                removeTask,
                activeTask,
                setActiveTask: manuallySetActiveTask,
                completePomodoroForTask,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    );
};
