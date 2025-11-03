export function DurationInput({ label, value, onChange }) {
    return (
        <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-sand/80">{label}</span>

            <input
                type="number"
                min={1}
                max={120}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="
          bg-stone-800 text-cream border border-stone-700 rounded-lg
          px-3 py-2 w-24 text-center 
          focus:outline-none focus:ring-2 focus:ring-terracotta/50
        "
            />
        </label>
    );
}
