import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "./pagination/pagination";
import { getTasks } from "../../../data/getTasks";
import { Backlog } from "./backlog/backlog";

export function PaginatedBacklog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [backlog, setBacklog] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleSizeChanged(pageSize) {
    setPageSize(pageSize);
  }

  const {
    isPending,
    isError,
    error,
    data: responseData,
  } = useQuery({
    queryKey: ["backlog", { currentPage, pageSize }],
    queryFn: () => getTasks(currentPage, pageSize),
  });

  useEffect(() => {
    if (responseData) {
      if (currentPage > responseData.meta.pagination.pageCount) {
        setCurrentPage(responseData.meta.pagination.pageCount);
      }
      setBacklog(responseData.data);
      setPageCount(responseData.meta.pagination.pageCount);
    }
  }, [responseData, currentPage]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(backlog);

  return (
    <>
      <Backlog backlog={backlog} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChanged={handlePageChanged}
        onSizeChanged={handleSizeChanged}
      />
    </>
  );
}
