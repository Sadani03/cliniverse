type ProfileSelectProps = {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

export function ProfileSelect({
  id,
  label,
  value,
  options,
  placeholder = "Select an option",
  required = false,
  onChange,
}: ProfileSelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-[#521C0D]"
      >
        {label}

        {required && (
          <span className="ml-1 text-[#D5451B]">
            *
          </span>
        )}
      </label>

      <select
        id={id}
        name={id}
        value={value}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-12 w-full rounded-2xl border border-white/75 bg-white/45 px-4 text-sm text-[#521C0D] outline-none transition focus:border-[#FF9B45] focus:bg-white/65 focus:ring-4 focus:ring-[#FF9B45]/10"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}