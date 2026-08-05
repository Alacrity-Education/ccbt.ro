import React from "react";

import type { CallToActionBlock as CTABlockProps, Form } from "@/payload-types";

import { CTAPrimitive } from "../Primitive";

export const SecondaryCTA: React.FC<CTABlockProps> = (props) => {
  return (
    <CTAPrimitive

      {...props}
      form={props.form as Form | undefined | null}
      bgToken="secondary" textToken="secondary" />
  );
};
