import { useState } from "react";
import { FiInfo } from "react-icons/fi";
export const ToolTip = ({ text }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <FiInfo
                size={16}
                className="cursor-pointer text-sand hover:text-cream"
                onClick={() => setOpen(!open)}
            />

            {open && (
                <div className="absolute left-6 top-1 z-50 bg-stone-800 text-sand p-2 rounded-md text-sm shadow-md border border-stone-700 w-52">
                    {text}
                </div>
            )}
        </div>
    );
};
