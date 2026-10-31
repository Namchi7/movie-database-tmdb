"use client";

import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";

const ErrorPage: React.FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full max-w-[75rem] mx-auto min-h-[50vh] flex flex-col justify-center items-center gap-4 px-4 py-16 text-center">
      <h2 className="text-[1.5rem] text-[#032541] font-semibold">
        Something went wrong.
      </h2>
      <p className="text-[#032541] opacity-70">
        We couldn&apos;t load this page. Please try again.
      </p>
      <Button variant={"mdb"} onClick={reset}>
        Try again
      </Button>
    </main>
  );
};

export default ErrorPage;
