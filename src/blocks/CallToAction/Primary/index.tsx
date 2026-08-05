import React from "react";

import type { CallToActionBlock as CTABlockProps, Form } from "@/payload-types";

import { CTAPrimitive } from "../Primitive";

export const PrimaryCTA: React.FC<CTABlockProps> = (props) => {
  return (
    <CTAPrimitive
      {...props}
      form={props.form as Form | undefined | null}
      bgToken="primary"
      textToken="primary"
    />
  );
};
