import type { Block, CheckboxField, Field } from 'payload'

import { fields as formBuilderFields } from '@payloadcms/plugin-form-builder'

/**
 * Extra form-builder field blocks and overrides.
 *
 * The plugin assembles the Forms collection's `fields` blocks straight from the
 * `fields` map it is given: a key it does not recognise is taken as a whole new
 * block, and a key it does recognise is deep-merged — with *arrays replaced*,
 * never concatenated. So adding one admin field to `select` means handing back
 * its entire field list, which is why both of these are built from the plugin's
 * own exports rather than written out again. See
 * `plugin-form-builder/dist/collections/Forms/index.js`.
 */

const blockFrom = (key: string): Block => formBuilderFields[key] as Block

/**
 * Phone.
 *
 * Structurally a text field — name, label, width, default, required — and kept
 * that way deliberately: the difference is on the front end, where it renders
 * `type="tel"` so a phone keypad comes up on mobile. No format validation,
 * because the numbers arriving here are Romanian landlines, mobiles and the
 * occasional international one, and a pattern strict enough to be worth having
 * would reject some of them.
 */
export const phoneBlock: Block = {
  ...blockFrom('text'),
  slug: 'phone',
  labels: {
    plural: 'Phone Fields',
    singular: 'Phone',
  },
}

const hasMany: CheckboxField = {
  name: 'hasMany',
  type: 'checkbox',
  admin: {
    description: 'Lets the visitor tick several options instead of picking one.',
  },
  label: 'Allow multiple selections',
}

/** The stock select block with the multiple-choice toggle appended. */
export const selectOverride: { fields: Field[] } = {
  fields: [...blockFrom('select').fields, hasMany],
}
