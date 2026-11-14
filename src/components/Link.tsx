import React from "react";
import NextLink from "next/link";

// next/link with prefetching off by default. Every page here is rendered on
// demand, so each viewport prefetch costs a server function invocation; a
// page full of posters was triggering dozens per visit. Pass prefetch
// explicitly to opt back in for a specific link.
const Link: React.FC<React.ComponentProps<typeof NextLink>> = ({
  prefetch = false,
  ...props
}) => <NextLink prefetch={prefetch} {...props} />;

export default Link;
