import { useState } from "react";
import { SelectorModal } from "./SelectorModal.jsx";
import { IoImages } from "react-icons/io5";

export const BackgroundTrigger = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <button onClick={() => setIsModalOpen(true)}>
            <IoImages size={24} />
            <SelectorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="background"
            />
        </button>
    );
};
