import { useState } from "react";
import { SelectorModal } from "./SelectorModal.jsx";
import { IoImages } from "react-icons/io5";

export const BackgroundTrigger = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div> 
            <button onClick={() => setIsModalOpen(!isModalOpen)}>
                <IoImages size={24} />
            </button>
            <SelectorModal isOpen={isModalOpen}/>
        </div>
    );
};
