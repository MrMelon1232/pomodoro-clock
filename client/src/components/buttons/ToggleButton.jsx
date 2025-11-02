// A reuseable toggle button
export const ToggleButton = ({ enabled, onChange }) => {
    return (
        <button
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                enabled ? "bg-green-500" : "bg-gray-400"
            }`}
        ></button>
    );
};
