import { useState, useEffect } from "react";
import { usePomodoroContext } from "../../context/usePomodoroContext";
import { PrimaryButton } from "../ui/buttons/PrimaryButton";

export const TaskModal = ({ isOpen, onClose, task = null }) => {
    const { addTask, editTask } = usePomodoroContext();

    // Var to check if we are editing a task
    const isEdit = !!task;

    // Task form states
    const [title, setTitle] = useState("");
    const [pomodoros, setPomodoros] = useState(1);
    const [notes, setNotes] = useState("");

    // Prefill when entering if there is already data
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setPomodoros(task.requiredPomodoros);
            setNotes(task.notes);
        } else {
            setTitle("");
            setPomodoros(1);
            setNotes("");
        }
    }, [task]);

    if (!isOpen) return null;

    // Function to save task changes
    const handleSave = () => {
        if (!title.trim()) return;

        // Check if we are editing an existing one or adding one
        if (isEdit) {
            editTask(task.id, {
                title,
                requiredPomodoros: pomodoros,
                notes,
            });
        } else {
            addTask(title, pomodoros, notes);
        }

        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-espresso w-full max-w-sm p-6b rounded-2xl shadow-lg border border-sand/20"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-semibold text-cream mb-4 text-center">
                    {isEdit ? <div>Edit Task</div> : <div>Add Task</div>}
                </h3>

                {/* Task Form */}
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Task title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent border border-sand/40 rounded-lg px-4 py-2 text-cream focus:outline-none focus:ring-2 focus:ring-sand"
                        required
                    />
                    <input
                        type="number"
                        min="1"
                        value={pomodoros}
                        onChange={(e) => setPomodoros(e.target.value)}
                        className="w-full bg-transparent border border-sand/40 rounded-lg px-4 py-2 text-cream focus:outline-none focus:ring-2 focus:ring-sand"
                        required
                    />
                    <textarea
                        placeholder="Notes (optional)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-transparent border border-sand/40 rounded-lg px-4 py-2 text-cream focus:outline-none focus:ring-2 focus:ring-sand resize-none"
                        rows="2"
                    />

                    <PrimaryButton
                        label="Submit"
                        onClick={handleSave}
                    ></PrimaryButton>
                </div>
            </div>
        </div>
    );
};
