import type {
  ChangeEvent,
  HTMLInputTypeAttribute,
} from "react";

type ProfileInputProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  min?: string;
  max?: string;
  required?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
};

export function ProfileInput({
  id,
  label,
  value,
  placeholder,
  type = "text",
  min,
  max,
  required = false,
  helperText,
  onChange,
}: ProfileInputProps) {
  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    onChange(event.target.value);
  }

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

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        min={min}
        max={max}
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
        className="h-12 w-full rounded-2xl border border-white/75 bg-white/45 px-4 text-sm text-[#521C0D] outline-none transition placeholder:text-[#85675E]/65 focus:border-[#FF9B45] focus:bg-white/65 focus:ring-4 focus:ring-[#FF9B45]/10"
      />

      {helperText && (
        <p className="mt-2 text-xs leading-5 text-[#85675E]">
          {helperText}
        </p>
      )}
    </div>
  );
}