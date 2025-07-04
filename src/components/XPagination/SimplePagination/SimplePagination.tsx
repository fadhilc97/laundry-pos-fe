import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib";

type Props = {
  page: number | string;
  lastPage: number;
  onChangePage: (page: number) => void;
};

export default function SimplePagination({
  page,
  lastPage,
  onChangePage,
}: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => +page > 1 && onChangePage(+page - 1)}>
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
          onClick={() => +page < lastPage && onChangePage(+page + 1)}
        >
          <PaginationNext
            className={cn(
              +page >= lastPage &&
                "hover:bg-transparent hover:text-muted-foreground cursor-not-allowed text-muted-foreground"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
