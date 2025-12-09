// A reuseable toggle button
export const ToggleButton = ({ enabled, onChange }) => {
    return (
        <button
            type="button"
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 rounded-full transition-colors 
                duration-300 focus:outline-none focus:ring-2 focus:ring-terracotta
                ${enabled ? "bg-terracotta" : "bg-gray-500"}
            `}
        >
            <span
                className={`
                    inline-block h-5 w-5 transform rounded-full bg-white shadow 
                    transition-transform duration-300
                    ${enabled ? "translate-x-5" : "translate-x-1"}
                `}
            />
        </button>
    );
};
