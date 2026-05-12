import * as React from "react";
import { cn } from "@/lib/utils";

export function Pagination({ page = 1, pageCount = 1, onPageChange, className }) {
  return (
    <nav className={cn("flex items-center gap-2", className)} aria-label="Pagination">
      <button
        type="button"
        className="rounded-lg border border-cream bg-white px-3 py-2 text-sm text-[#1A1A1A] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="text-sm text-[#5C5C5C]">Page {page} of {pageCount}</span>
      <button
        type="button"
        className="rounded-lg border border-cream bg-white px-3 py-2 text-sm text-[#1A1A1A] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page >= pageCount}
      >
        Next
      </button>
    </nav>
  );
}
