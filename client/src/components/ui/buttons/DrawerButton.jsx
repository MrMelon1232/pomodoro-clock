import { BsPlusCircle } from "react-icons/bs";

export const DrawerButton = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center gap-2
                bg-terracotta hover:bg-terracotta/90
                text-cream font-medium tracking-wide
                rounded-full shadow-lg
                px-8 py-3
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-terracotta/50
            "
        >
            <BsPlusCircle size={24} className="mr-2 " />
            <label> {label} </label>
        </button>
    );
};
