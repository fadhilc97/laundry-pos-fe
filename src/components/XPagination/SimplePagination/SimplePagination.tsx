import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib";
import { useSearchParams } from "react-router";

type Props = {
  lastPage: number;
};

export default function SimplePagination({ lastPage }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get("page") || "1");

  function handleChangePage(page: number) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page.toString());
      return Object.fromEntries(params.entries());
    });
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => page > 1 && handleChangePage(page - 1)}>
          <PaginationPrevious
            className={cn(
              +page <= 1 &&
                "hover:bg-transparent hover:text-muted-foreground cursor-not-allowed text-muted-foreground"
            )}
          />
        </PaginationItem>
        <PaginationItem>
          <div className="px-2.5">
            {page} of {lastPage}
          </div>
        </PaginationItem>
        <PaginationItem
          onClick={() => page < lastPage && handleChangePage(page + 1)}
        >
          <PaginationNext
            className={cn(
              page >= lastPage &&
                "hover:bg-transparent hover:text-muted-foreground cursor-not-allowed text-muted-foreground"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
