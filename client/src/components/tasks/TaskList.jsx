import { useState } from "react";
import { usePomodoroContext } from "../../context/usePomodoroContext";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { TaskCard } from "./TaskCard";
import { TaskModal } from "./TaskModal";
import { PrimaryButton } from "../ui/buttons/PrimaryButton";

export const TaskList = () => {
    const { tasks, removeTask, activeTask, setActiveTaskId, resetTasks } =
        usePomodoroContext();

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <h2 className="text-cream text-lg font-semibold text-center">
                    Your Tasks
                </h2>

                {/* Button to reset all tasks */}
                {tasks.length > 0 && (
                    <button
                        onClick={resetTasks}
                        className="text-sand/70 hover:text-sand text-sm"
                    >
                        <RiDeleteBinFill />
                    </button>
                )}
            </div>

            {/* Task list */}
            <div className="max-h-64 overflow-y-auto space-y-3">
                {tasks.length === 0 ? (
                    <p className="text-cream/70 text-center">
                        No tasks yet. Add one below!
                    </p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            isActive={activeTask?.id === task.id}
                            onSelect={() => setActiveTaskId(task.id)}
                            onRemove={() => removeTask(task.id)}
                        />
                    ))
                )}
            </div>

            {/* Add new task form */}
            <div className="pt-4 border-t border-sand/30 flex justify-center">
                <PrimaryButton
                    label="Add Task"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Task
                    <MdAddCircle />{" "}
                </PrimaryButton>
            </div>

            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
