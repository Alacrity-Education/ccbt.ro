import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

/**
 * A text field that announces itself as a phone number.
 *
 * `type="tel"` is what brings up the keypad on a phone and lets a password
 * manager or the browser offer a saved number; `autoComplete="tel"` is what
 * makes that offer accurate. Nothing is validated beyond required — see the
 * phone block in `plugins/formFields.ts` for why.
 */
export const Phone: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
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
      <Input
        autoComplete="tel"
        defaultValue={defaultValue}
        id={name}
        inputMode="tel"
        type="tel"
        {...register(name, { required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
