"use client";

import { RowLabelProps, useRowLabel } from "@payloadcms/ui";

import type { PublicationsBlock } from "@/payload-types";

/**
 * Rows start collapsed, so without this every publication in the list reads
 * "Publication 01" and an editor has to open each one to find the right book.
 */
export const PublicationRowLabel: React.FC<RowLabelProps> = () => {
  const row = useRowLabel<NonNullable<PublicationsBlock["items"]>[number]>();

  const number = row?.rowNumber !== undefined ? row.rowNumber + 1 : "";
  const title = row?.data?.title;
  const year = row?.data?.year;

  if (!title) return <div>{`Publication ${number}`}</div>;

  return <div>{year ? `${title} (${year})` : title}</div>;
};
