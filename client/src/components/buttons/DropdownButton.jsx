// A reuseable dropdown with entry button
export const DropdownButton = ({ label, value, onChange, options }) => {
    return (
        <label className="flex flex-col gap-1">
            {label}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border rounded px-2 py-1"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </label>
    );
};
