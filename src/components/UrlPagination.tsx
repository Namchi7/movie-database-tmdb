"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Pagination from "./Pagination";

// Pagination that keeps the page in the URL (?page=N) so server pages can read it
const UrlPagination: React.FC<{ page: number; lastPage: number }> = ({
  page,
  lastPage,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setPage = (pageNo: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNo));
    router.push(`${pathname}?${params.toString()}`);
  };

  return <Pagination page={page} lastPage={lastPage} setPage={setPage} />;
};

export default UrlPagination;
