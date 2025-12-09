export const PrimaryButton = ({
    label,
    onClick,
    active = false,
    color = "gray",
}) => {
    const palette = {
        terracotta: {
            bg: "bg-terracotta",
            border: "border-terracotta",
            text: "text-cream",
            hoverBg: "hover:bg-terracotta/80",
            activeBg: "bg-terracotta/90",
            ring: "focus:ring-terracotta",
        },
        sage: {
            bg: "bg-sage",
            border: "border-sage",
            text: "text-espresso",
            hoverBg: "hover:bg-sage/80",
            activeBg: "bg-sage/90",
            ring: "focus:ring-sage",
        },
        sand: {
            bg: "bg-sand",
            border: "border-sand",
            text: "text-espresso",
            hoverBg: "hover:bg-sand/80",
            activeBg: "bg-sand/90",
            ring: "focus:ring-sand",
        },
        gray: {
            bg: "bg-gray-700",
            border: "border-gray-500",
            text: "text-gray-200",
            hoverBg: "hover:bg-gray-800",
            activeBg: "bg-gray-600",
            ring: "focus:ring-gray-500",
        },
    };

    const baseColor = palette[color] || palette.gray;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
        ${baseColor.bg} ${baseColor.border} ${baseColor.text}
        ${baseColor.hoverBg} transition-all duration-300
        focus:outline-none focus:ring-2 ${baseColor.ring}
        px-6 py-2 rounded-full font-medium shadow-md
        ${active ? `${baseColor.activeBg} border-white font-semibold` : ""}
      `}
        >
            {label}
        </button>
    );
};
