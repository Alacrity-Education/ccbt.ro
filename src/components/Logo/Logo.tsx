import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
  } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  return (
    /* eslint-disable @next/next/no-img-element */
    <>
      <img
        alt="CCBT Logo"
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx(
          " h-10 p-1 inline-block sm:h-16 sm:p-2",
          className,
        )}
        src="/logo.svg"
      />
      {/* <img
        alt="CCBT Logo"
        width={50}
        height={50}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx("block h-10 p-1 sm:hidden", className)}
        src="/logo-sm.svg"
      /> */}
    </>
  );
};
