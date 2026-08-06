type ProfileTextareaProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  helperText?: string;
  rows?: number;
  onChange: (value: string) => void;
};

export function ProfileTextarea({
  id,
  label,
  value,
  placeholder,
  helperText,
  rows = 4,
  onChange,
}: ProfileTextareaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-[#521C0D]"
      >
        {label}
      </label>

      <textarea
        id={id}
        name={id}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full resize-none rounded-[22px] border border-white/75 bg-white/45 p-4 text-sm leading-6 text-[#521C0D] outline-none transition placeholder:text-[#85675E]/65 focus:border-[#FF9B45] focus:bg-white/65 focus:ring-4 focus:ring-[#FF9B45]/10"
      />

      {helperText && (
        <p className="mt-2 text-xs leading-5 text-[#85675E]">
          {helperText}
        </p>
      )}
    </div>
  );
}