import { BsPlusCircle } from "react-icons/bs";

export const DrawerButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="
                fixed bottom-8 right-8
                flex items-center justify-center
                bg-terracotta hover:bg-terracotta/90
                text-cream font-medium tracking-wide
                rounded-full shadow-lg
                px-8 py-3
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-terracotta/50
            "
        >
            <BsPlusCircle size={24} className="mr-2" />
            Check your Tasks!
        </button>
    );
};
