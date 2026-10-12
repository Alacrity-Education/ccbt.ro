import type { SelectField } from "@payloadcms/plugin-form-builder/types";
import type { Control, FieldErrorsImpl } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Controller } from "react-hook-form";

import { Error } from "../Error";
import { Width } from "../Width";

/** `hasMany` comes from the block override in `plugins/formFields.ts`. */
type Props = SelectField & {
  control: Control;
  errors: Partial<FieldErrorsImpl>;
  hasMany?: boolean | null;
};

/**
 * Splits a multiple-choice field's default into the values it names.
 *
 * The block stores one text default for both shapes of the field, so a
 * multiple-choice default is written as a comma-separated list. Anything that
 * doesn't match a real option is dropped rather than submitted blind.
 */
const defaultSelection = (
  defaultValue: string | null | undefined,
  options: SelectField["options"],
): string[] => {
  if (!defaultValue) return [];
  const known = new Set(options.map((option) => option.value));
  return defaultValue
    .split(",")
    .map((value) => value.trim())
    .filter((value) => known.has(value));
};

export const Select: React.FC<Props> = ({
  name,
  control,
  errors,
  hasMany,
  label,
  options,
  required,
  width,
  defaultValue,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}
        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      {hasMany ? (
        <Controller
          control={control}
          defaultValue={defaultSelection(defaultValue, options)}
          name={name}
          render={({ field: { onChange, value } }) => {
            const selected: string[] = Array.isArray(value) ? value : [];
            const toggle = (option: string) =>
              onChange(
                selected.includes(option)
                  ? selected.filter((v) => v !== option)
                  : [...selected, option],
              );

            return (
              // The same white box as the single-choice trigger, holding the
              // options themselves. A dropdown would have been closer to the
              // one-of-many field visually, but a tick list says "take as many
              // as you like" without the visitor having to discover it.
              //
              // The box sets the text colour and the rows inherit it: on a
              // brand panel every `label` is told to inherit white, and a white
              // label on this white box would be nothing at all.
              <div
                className="bg-base-100 text-base-content max-h-56 w-full space-y-2 overflow-y-auto rounded border px-3 py-2"
                id={name}
                role="group"
              >
                {options.map((option) => (
                  <label
                    className="flex cursor-pointer items-start gap-2 text-sm"
                    key={option.value}
                  >
                    <input
                      checked={selected.includes(option.value)}
                      className="checkbox checkbox-primary checkbox-sm mt-0.5"
                      onChange={() => toggle(option.value)}
                      type="checkbox"
                      value={option.value}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            );
          }}
          // An empty array is truthy, so `required` alone would never fire
          // here — the check has to look at the length.
          rules={{
            validate: (value) =>
              !required || (Array.isArray(value) && value.length > 0),
          }}
        />
      ) : (
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ field: { onChange, value } }) => {
            const controlledValue = options.find((t) => t.value === value);

            return (
              <SelectComponent
                onValueChange={(val) => onChange(val)}
                value={controlledValue?.value}
              >
                <SelectTrigger
                  className="bg-base-100 w-full text-black"
                  id={name}
                >
                  <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent className="bg-base-100 text-black">
                  {options.map(({ label, value }) => {
                    return (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </SelectComponent>
            );
          }}
          rules={{ required }}
        />
      )}
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
