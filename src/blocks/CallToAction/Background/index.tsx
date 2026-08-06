import React from "react";

import type { CallToActionBlock as CTABlockProps, Form } from "@/payload-types";

import { CTAPrimitive } from "../Primitive";

export const BackgroundCTA: React.FC<CTABlockProps> = (props) => {
  if( typeof  props.form != "number")
  return (
    <CTAPrimitive
      {...props}
      form = {props.form  }
      bgToken="primary"
      textToken="primary"
      useMediaBackground
    />
  );
};
