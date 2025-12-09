export const CarouselButton = ({
    onClick,
    icon,
    ariaLabel,
    className = "",
}) => {
    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={`flex items-center justify-center rounded-full p-2 bg-stone-700 hover:bg-stone-600 text-sand shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-terracotta transition ${className}`}
        >
            {icon}
        </button>
    );
};
