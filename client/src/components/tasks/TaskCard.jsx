import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { useState } from "react";
import { TaskModal } from "./TaskModal";

export const TaskCard = ({ task, isActive, onSelect, onRemove }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <div
            className={`flex justify-between items ${
                isActive ? "bg-sand/30" : ""
            }`}
        >
            <div className="flex flex-col">
                <p className="text-cream font-medium">{task.title}</p>
                <p className="text-sm text-cream/60">
                    {task.completedPomodoros}/{task.requiredPomodoros} pomodoros
                </p>

                <p className="text-cream font-medium">Notes</p>
                <p className="text-cream font-medium">{task.notes}</p>
            </div>

            {/* Task Actions */}
            <div className="">
                {/* Edit Task */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditOpen(true);
                    }}
                    className=""
                >
                    <MdEditNote />
                </button>

                {/* Remove Task */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="text-sand/60 hover:text-sand transition-colors duration-200"
                >
                    <MdDeleteForever />
                </button>

                {/* Mark it as active task */}
                <label>
                    Mark as active task:
                    <input
                        type="checkbox"
                        name="Active Task"
                        checked={isActive}
                        onChange={onSelect}
                    ></input>
                </label>
            </div>

            {/* Modal for editing */}
            <TaskModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                task={task}
            />
        </div>
    );
};
