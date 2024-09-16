import React from "react";
import { Button } from "./ui/button";
import { PaginationCompType } from "@/constants/types";

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
          size={"pg"}
          onClick={() => setPage(1)}
          disabled={page === 1 ? true : false}
        >
          First
        </Button>

        <Button
          variant={"pagination"}
          size={"pg"}
          onClick={() => setPage(page - 1)}
          disabled={page === 1 ? true : false}
        >
          Prev
        </Button>
      </div>

      <div className="flex flex-nowrap justify-start items-center gap-2">
        {page - 2 > 0 && (
          <Button
            variant={"pagination"}
            size={"pg"}
            onClick={() => setPage(page - 2)}
          >
            {page - 2}
          </Button>
        )}

        {page - 1 > 0 && (
          <Button
            variant={"pagination"}
            size={"pg"}
            onClick={() => setPage(page - 1)}
          >
            {page - 1}
          </Button>
        )}

        <Button
          variant={"pagination"}
          size={"pg"}
          onClick={() => setPage(page)}
          className="hover:bg-[#90cea1]/60 bg-[#90cea1]/60"
        >
          {page}
        </Button>

        {page < lastPage && (
          <Button
            variant={"pagination"}
            size={"pg"}
            onClick={() => setPage(page + 1)}
          >
            {page + 1}
          </Button>
        )}

        {page + 1 < lastPage && (
          <Button
            variant={"pagination"}
            size={"pg"}
            onClick={() => setPage(page + 2)}
          >
            {page + 2}
          </Button>
        )}
      </div>

      <div className="flex flex-nowrap justify-start items-center gap-2">
        <Button
          variant={"pagination"}
          size={"pg"}
          onClick={() => setPage(page + 1)}
          disabled={page === lastPage ? true : false}
        >
          Next
        </Button>

        <Button
          variant={"pagination"}
          size={"pg"}
          onClick={() => setPage(lastPage)}
          disabled={page === lastPage ? true : false}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
