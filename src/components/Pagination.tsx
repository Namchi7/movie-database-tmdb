import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { PaginationCompType } from "@/constants/types";

import first from "@/assets/images/first.png";
import prev from "@/assets/images/prev.png";
import next from "@/assets/images/next.png";
import last from "@/assets/images/last.png";

const Pagination: React.FC<PaginationCompType> = ({
  page,
  lastPage,
  setPage,
}) => {
  return (
    <div className="w-full flex flex-nowrap justify-between items-center gap-4">
      <div className="flex flex-nowrap justify-start items-center gap-2">
        <Button
          variant={"pagination"}
          size={"pg-icon"}
          onClick={() => setPage(1)}
          disabled={page === 1 ? true : false}
        >
          <div className="aspect-square h-8 flex justify-center items-center">
            <Image src={first} alt="First" className="size-full" />
          </div>
        </Button>

        <Button
          variant={"pagination"}
          size={"pg-icon"}
          onClick={() => setPage(page - 1)}
          disabled={page === 1 ? true : false}
        >
          <div className="aspect-square h-8 flex justify-center items-center">
            <Image src={prev} alt="Prev" className="size-full" />
          </div>
        </Button>
      </div>

      <div className="flex flex-nowrap justify-start items-center gap-2">
        {page - 2 > 0 && (
          <Button
            variant={"pagination"}
            size={"pg"}
            onClick={() => setPage(page - 2)}
            className="hidden md:inline-flex min-h-8"
          >
            {page - 2}
          </Button>
        )}

        {page - 1 > 0 && (
          <Button
            variant={"pagination"}
            size={"pg"}
            onClick={() => setPage(page - 1)}
            className="min-h-8"
          >
            {page - 1}
          </Button>
        )}

        <Button
          variant={"pagination"}
          size={"pg"}
          onClick={() => setPage(page)}
          className="min-h-8 hover:bg-[#90cea1]/60 bg-[#90cea1]/60"
        >
          {page}
        </Button>

        {page < lastPage && (
          <Button
            variant={"pagination"}
            size={"pg"}
            onClick={() => setPage(page + 1)}
            className="min-h-8"
          >
            {page + 1}
          </Button>
        )}

        {page + 1 < lastPage && (
          <Button
            variant={"pagination"}
            size={"pg"}
            onClick={() => setPage(page + 2)}
            className="hidden md:inline-flex min-h-8"
          >
            {page + 2}
          </Button>
        )}
      </div>

      <div className="flex flex-nowrap justify-start items-center gap-2">
        <Button
          variant={"pagination"}
          size={"pg-icon"}
          onClick={() => setPage(page + 1)}
          disabled={page === lastPage ? true : false}
        >
          <div className="aspect-square h-8 flex justify-center items-center">
            <Image src={next} alt="Next" className="size-full" />
          </div>
        </Button>

        <Button
          variant={"pagination"}
          size={"pg-icon"}
          onClick={() => setPage(lastPage)}
          disabled={page === lastPage ? true : false}
        >
          <div className="aspect-square h-8 flex justify-center items-center">
            <Image src={last} alt="Last" className="size-full" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
