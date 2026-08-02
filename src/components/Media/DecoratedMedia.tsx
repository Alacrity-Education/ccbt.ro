import React from "react";

import { cn } from "@/utilities/ui";
import { Media } from "@/components/Media";
import {
  CornerDecorator,
  type DecoratorColor,
} from "@/components/CornerDecorator";

import type { Props as MediaProps } from "./types";

export type MediaDecorator = {
  enabled?: boolean | null;
  verticalColor?: DecoratorColor | null;
  horizontalColor?: DecoratorColor | null;
} | null;

type DecoratedMediaProps = {
  resource: MediaProps["resource"];
  decorator?: MediaDecorator;
  className?: string;
};

export const DecoratedMedia: React.FC<DecoratedMediaProps> = ({
  resource,
  decorator,
  className,
}) => {
  const showDecorator = Boolean(decorator?.enabled);

  return (
    <div className={cn("relative", className)}>
      <Media
        resource={resource}
        className="w-full"
        imgClassName={cn("h-auto w-full", !showDecorator && "rounded-box")}
      />
      {showDecorator && (
        <CornerDecorator
          verticalColor={decorator?.verticalColor}
          horizontalColor={decorator?.horizontalColor}
          className="pointer-events-none absolute top-0 right-0 z-10"
        />
      )}
    </div>
  );
};
