export const SecondaryButton = ({
    label,
    onClick,
    active = false,
    color = "gray",
}) => {
    const baseColor = {
        gray: {
            border: "border-gray-500",
            text: "text-gray-200",
            hoverBg: "hover:bg-gray-800",
            activeBg: "bg-gray-700",
            ring: "focus:ring-gray-500",
        },
        blue: {
            border: "border-blue-400",
            text: "text-blue-300",
            hoverBg: "hover:bg-blue-900/20",
            activeBg: "bg-blue-900/30",
            ring: "focus:ring-blue-500",
        },
    }[color];

    return (
        <button
            onClick={onClick}
            className={`px-5 py-2 rounded-full border ${baseColor.border} ${
                baseColor.text
            }
        ${baseColor.hoverBg} transition-all duration-300 focus:outline-none 
        focus:ring-2 ${baseColor.ring}
        ${active ? baseColor.activeBg + " border-white font-semibold" : ""}`}
        >
            {label}
        </button>
    );
};
