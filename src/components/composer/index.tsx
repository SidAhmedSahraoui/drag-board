import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "../button";
import { Input } from "../input";

type ComposerProps = {
  label: string;
  placeholder: string;
  submitLabel: string;
  maxLength: number;
  keepOpen?: boolean;
  onSubmit: (value: string) => void;
  onCancel: () => void;
};

export function Composer({ label, placeholder, submitLabel, maxLength, keepOpen, onSubmit, onCancel }: ComposerProps) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
    if (!keepOpen) onCancel();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onCancel();
    }
  };

  return (
    <form onSubmit={submit} onKeyDown={onKeyDown} className="flex flex-col gap-2">
      <Input
        autoFocus
        label={label}
        hideLabel
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={!trimmed}>
          {submitLabel}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
