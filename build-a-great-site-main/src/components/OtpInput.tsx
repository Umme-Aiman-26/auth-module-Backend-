import { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export default function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const focusInput = (i: number) => inputs.current[i]?.focus();

  const handleChange = (i: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const arr = [...digits];
    arr[i] = char;
    onChange(arr.join(""));
    if (char && i < length - 1) focusInput(i + 1);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) focusInput(i - 1);
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted.padEnd(length, " ").trim());
    focusInput(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex gap-2.5 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className="h-13 w-11 rounded-lg border border-input bg-card text-center text-lg font-semibold text-foreground shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      ))}
    </div>
  );
}
