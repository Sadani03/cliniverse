type SymptomDetailsProps = {
  details: string;
  onChange: (details: string) => void;
};

export function SymptomDetails({
  details,
  onChange,
}: SymptomDetailsProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold">
        Tell Nova anything else that may help
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#85675E]">
        You may mention temperature, triggers, recent travel,
        medicines, allergies, or other symptoms.
      </p>

      <textarea
        value={details}
        onChange={(event) => onChange(event.target.value)}
        rows={8}
        placeholder="Example: The headache started this morning after I skipped breakfast..."
        className="mt-6 w-full resize-none rounded-[24px] border border-white/75 bg-white/45 p-5 text-sm leading-6 outline-none transition placeholder:text-[#85675E]/65 focus:border-[#FF9B45] focus:bg-white/60"
      />

      <p className="mt-3 text-xs text-[#85675E]">
        Do not include passwords, financial information, or
        highly sensitive personal identifiers.
      </p>
    </div>
  );
}