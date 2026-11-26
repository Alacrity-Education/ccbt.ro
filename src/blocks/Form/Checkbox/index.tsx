import type { CheckboxField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import React from "react";
import { Error } from "../Error";
import { Width } from "../Width";

/**
 * A consent box has to be able to point at the policy it consents to, and the
 * form builder's label is plain text. So the label understands one piece of
 * markup — `[text](address)` — and renders it as a link:
 *
 *   Sunt de acord cu [Politica de confidențialitate](/protectia-datelor).
 *
 * It opens in a new tab, so following it does not throw away a half-filled
 * form. Only site paths, https and mailto are accepted as addresses; anything
 * else is left as the text it was written as.
 */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const SAFE_HREF = /^(\/(?!\/)|https:\/\/|mailto:)/;

const renderLabel = (label: string): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const match of label.matchAll(LINK)) {
    const [whole, text, href] = match;
    const at = match.index ?? 0;
    if (!SAFE_HREF.test(href)) continue;
    out.push(label.slice(last, at));
    out.push(
      <a
        key={at}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="link link-primary"
      >
        {text}
      </a>,
    );
    last = at + whole.length;
  }
  out.push(label.slice(last));
  return out;
};

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  // 1. Get the registration props
  const props = register(name, { required: required });

  return (
    <Width width={width}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          // 2. Use defaultChecked for initial state in RHF
          defaultChecked={defaultValue}
          id={name}
          // 3. Spread props. This includes name, ref, onChange, and onBlur.
          // Do NOT add another onChange after this.
          {...props}
          className="checkbox checkbox-primary"
        />
        <Label htmlFor={name}>
          {required && (
            <span className="required">
              * <span className="sr-only">(required)</span>
            </span>
          )}
          {typeof label === "string" ? renderLabel(label) : label}
        </Label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
